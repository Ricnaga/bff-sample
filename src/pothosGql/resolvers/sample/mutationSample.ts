import { MoreSample } from "@/domain/sample/moreSampleDomain";
import { builder } from "@/pothosGql/builder";

builder.mutationField("firstMoreSample", (t) =>
  t.field({
    type: MoreSample,
    resolve: () =>
      new MoreSample(
        "firstMoreSampleId",
        "firstMoreSampleName",
        "firstMoreSampleLastName"
      ),
  })
);

builder.mutationFields((t) => ({
  secondMoreSample: t.field({
    type: MoreSample,
    resolve: () =>
      new MoreSample(
        "firstMoreSampleId",
        "firstMoreSampleName",
        "firstMoreSampleLastName"
      ),
  }),
}));
