import { promises as fs } from 'fs'; // Use the 'promises' API for fs
import { parseStringPromise } from 'xml2js'; // Use destructuring to import the function
import path from 'path'
import { Make, VehicleType } from '../interfaces';


export const getAllMakesFile = async ():  Promise<Make[]> => {
    try {
        const filePath = path.join(__dirname,'..', 'localData', 'getallmakes.xml');
        const xmlData: string = await fs.readFile(filePath, 'utf8');
        const jsonData: any = await parseStringPromise(xmlData);
        return jsonData.Response.Results[0].AllVehicleMakes;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getVehicleTypesFile = async (makeId: number): Promise<VehicleType[]> => {
  try{
    const filePath = path.join(__dirname, '..', 'localData', `getVehicleTypesForMakeId-${makeId.toString().substring(0,1)}.xml`);
    const xmlData: string = await fs.readFile(filePath, 'utf8');
    const jsonData: any = await parseStringPromise(xmlData);
    return jsonData.Response.Results[0].VehicleTypesForMakeIds;
  }catch(error){
    console.log(error);
    return []
  }
}
