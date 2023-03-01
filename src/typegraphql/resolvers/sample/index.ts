import { NonEmptyArray } from "type-graphql";
import { SampleResolver } from "./sampleController/sample.resolver";

export const ms_sample: NonEmptyArray<Function> | NonEmptyArray<string> = [
  SampleResolver,
];
