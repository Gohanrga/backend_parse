import { getAllMakes, getVehicleTypes } from "../service/ParserService";

describe('getAllMakes', () => {
  it('should return the correct number of makes', async () => {
    const result = await getAllMakes(true);
    expect(result).toHaveLength(11385);
  });
  it('should match the first make entry with the mock data', async () => {
    const mockMakes = { Make_ID: ['12858'], Make_Name: ['#1 ALPINE CUSTOMS'] };
    const result = await getAllMakes(true);
    expect(JSON.stringify(result[0])).toBe(JSON.stringify(mockMakes));
  });
});

describe('getVehicleType', () => {
  it('should be true comparing the first data with the mock', async() => {
    const mockId = 12858
    const result = await getVehicleTypes(mockId, true)
    expect(result).toHaveLength(2)
  });
  it('should match the first vehicle type with mock data', async () => {
    const mockId = 12858;
    const expectedFirstVehicleType = { 
      VehicleTypeId: ['2'], 
      VehicleTypeName: ['Passenger Car'] 
    };
    const result = await getVehicleTypes(mockId, true);
    expect(result[0]).toEqual(expectedFirstVehicleType);
  });
  it('should match the second vehicle type with mock data', async () => {
    const mockId = 12858;
    const expectedSecondVehicleType = {
      VehicleTypeId: ['7'],
      VehicleTypeName: ['Multipurpose Passenger Vehicle (MPV)']
    };
    const result = await getVehicleTypes(mockId, true);
    expect(result[1]).toEqual(expectedSecondVehicleType);
  });
});