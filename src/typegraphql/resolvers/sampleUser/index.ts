import { NonEmptyArray } from "type-graphql";
import { SampleUserResolver } from "./sampleUserController/sampleUser.resolver";

export const ms_sampleUser: NonEmptyArray<Function> | NonEmptyArray<string> = [
  SampleUserResolver,
];
