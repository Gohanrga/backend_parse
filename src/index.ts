import { ApolloServer } from 'apollo-server';
//import express from "express";
//import { getAllMakesWithTypes } from "./controller/ParserController"; 
import connectToDatabase from "./bootstrap/database";
import dotenv from 'dotenv';
import { makeResolvers } from './resolver/MakeResolver';
import { typeDefs } from './schema/MakeSchema';
dotenv.config();

connectToDatabase()
const server = new ApolloServer({
  typeDefs,
  resolvers: makeResolvers
});

server.listen().then(({ url }) => {
  console.log(`Server ready in url: ${url}`);
});

