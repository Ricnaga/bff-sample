import { NonEmptyArray } from "type-graphql";
import { ms_sample } from "./sample";
import { ms_sampleUser } from "./sampleUser";

export const resolvers = [
  ...ms_sample,
  ...ms_sampleUser
] as NonEmptyArray<Function> | NonEmptyArray<string>;
