import { MakeModel } from "../model/MakeModel";
import { saveMakesWithVehicleTypes } from "../service/ParserService";

export const makeResolvers = {
  Query: {
    getAllMakes: async (_: any, { page = 1, limit = 100 }) => {
      const skip = (page - 1) * limit;
      return MakeModel.find().skip(skip).limit(limit);
    },
    getMakeById: async (_: any, { makeId }: { makeId: number }) => {
      return MakeModel.findOne({ makeId });
    }
  },
  Mutation: {
    fetchAndStoreData: async (_: any, { useLocal = false }: { useLocal?: boolean }) => {
      await saveMakesWithVehicleTypes(useLocal);
      return "The data was fetched and stored successfully";
    }
  }
}