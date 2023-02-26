import { NonEmptyArray } from "type-graphql";
import { SampleResolver } from "./sampleController/sample.resolver";
import { SampleDetailsResolver } from "./sampleController/sampleDetails.resolver";

export const microservices: NonEmptyArray<Function> | NonEmptyArray<string> = [
  SampleResolver,
  SampleDetailsResolver
];
