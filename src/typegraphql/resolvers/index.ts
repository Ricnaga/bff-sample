import { NonEmptyArray } from "type-graphql";
import { microservices } from "./microservice";

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  ...microservices,
];
