import { builder } from "../../builder";

export enum SampleEnum {
  SAMPLE = "SAMPLE",
  MORESAMPLE = "MORE_SAMPLE",
}

export const sampleEnumBuilder = builder.enumType(SampleEnum, {
  name: "SAMPLEENUM",
});
