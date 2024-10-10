import { gql } from "apollo-server-express";

export const typeDefs = gql`
  #types
  type VehicleTypes {
    typeId: Int
    typeName: String
  }

  type Make {
    makeId: Int
    makeName: String
    vehicleTypes: [VehicleTypes]
  }

  #querys
  type Query {
    getAllMakes(page: Int, limit: Int): [Make]
    getMakeById(makeId: Int!): Make
  }

  #Mutations
  type Mutation {
    fetchAndStoreData(useLocal: Boolean): String
  }
`