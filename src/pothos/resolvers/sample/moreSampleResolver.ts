import { MoreSample } from "@/domain/sample/moreSampleDomain";
import { Sample } from "@/domain/sample/sampleDomain";
import { builder } from "@/pothos/builder";

builder.objectType(MoreSample, {
  name: "MoreSample",
  description: "This is a MORE Sample.",
  fields: (t) => ({
    moreUuid: t.exposeString("moreSampleId"),
    moreName: t.exposeString("moreSampleINome"),
    moreLastName: t.exposeString("moreSampleISobrenome"),
  }),
});

builder.objectField(MoreSample, "OtherName", (t) =>
  t.string({
    resolve: (parent) => "OTHER" + parent.moreSampleINome,
  })
);

builder.objectFields(MoreSample, (t) => ({
  moreSampleObject: t.field({
    type: Sample,
    resolve: () =>
      new Sample(
        "objectMoreSampleId",
        "objectMoreSampleName",
        "objectMoreSampleLastName"
      ),
  }),
}));

builder.queryField("secondMoreExample", (t) =>
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

builder.queryFields((t) => ({
  firstMoreSample: t.field({
    type: MoreSample,
    resolve: () =>
      new MoreSample(
        "secondMoreSampleId",
        "secondMoreSampleName",
        "secondMoreSampleLastName"
      ),
  }),
}));
