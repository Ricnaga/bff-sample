import { NonEmptyArray } from "type-graphql";
import { SampleResolver } from "./sampleController/sample.resolver";

export const microservices: NonEmptyArray<Function> | NonEmptyArray<string> = [
  SampleResolver,
];
