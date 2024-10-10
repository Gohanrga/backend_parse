import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { Make, VehicleType } from '../interfaces';
import { MakeModel } from '../model/MakeModel';
import Bottleneck from "bottleneck";
import { getAllMakesFile, getVehicleTypesFile } from './ParserServiceFromFile';

const limiter = new Bottleneck({ maxConcurrent: 20, minTime: 200 });


const _fetchMakesApi =  async (): Promise<Make[]> => {
  const response = await axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=xml');
  const xmlData = response.data;
  //parsing data 
  const jsonData = await parseStringPromise(xmlData);
  return jsonData.Response.Results[0].AllVehicleMakes;
}

//get all makes and parsing to become in json
export const getAllMakes = async(testMode: boolean = false): Promise<Make[]> =>{
  try{
    //to test purposes
    if(testMode){
      return getAllMakesFile()  
    }
    return _fetchMakesApi()
  }catch(error){
    //if the service is not available get from the local file
    return getAllMakesFile()
  } 
}

//get vehicle type
export const getVehicleTypes = async (makeId: number, testMode: boolean = false): Promise<VehicleType[]> => {
  try{
    //to test purposes
    if(testMode){
      return getVehicleTypesFile(makeId)  
    }
    const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${makeId}?format=xml`);
    const xmlData = response.data;
    const jsonData = await parseStringPromise(xmlData);
    return jsonData.Response.Results[0].VehicleTypesForMakeIds;
  } catch(error){
     //if the service is not available get from the local file
    return getVehicleTypesFile(makeId)
  }
}


export const fetchAllMakesWithTypes = async (useLocal=false) => {
  const makes = await getAllMakes(useLocal);
  if (makes.length === 0) {
    return [];
  }

  const result = await Promise.all(
    makes.map((make: Make) =>
      limiter.schedule(async () => {
        const vehicleTypesArray = await getVehicleTypes(make.Make_ID[0], useLocal);
        return {
          makeId: make.Make_ID[0],
          makeName: make.Make_Name[0],
          vehicleTypes: vehicleTypesArray?.map(v => ({
            typeId: v.VehicleTypeId[0],
            typeName: v.VehicleTypeName[0],
          })),
        };
      })
    )
  );

  return result;
};

export async function saveMakesWithVehicleTypes(useLocal=false) {
  //first we clean the data 
  await MakeModel.deleteMany({});
  const makesWithVehicleTypes = await fetchAllMakesWithTypes(useLocal);
  //after get the information we are going to insert all the data 
  await MakeModel.insertMany(makesWithVehicleTypes);
}