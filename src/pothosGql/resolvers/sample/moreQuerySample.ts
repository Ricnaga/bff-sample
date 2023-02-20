import { MoreSample } from "@/domain/sample/moreSampleDomain";
import { Sample } from "@/domain/sample/sampleDomain";
import { builder } from "@/pothosGql/builder";
import { encodeGlobalID } from "@pothos/plugin-relay";

builder.objectType(MoreSample, {
  name: "MoreSample",
  description: "This is a MORE Sample.",
  fields: (t) => ({
    moreUuid: t.globalID({
      resolve: (parent) => encodeGlobalID(MoreSample.name, parent.moreSampleId),
    }),
    moreName: t.exposeString("moreSampleNome"),
    moreLastName: t.exposeString("moreSampleSobrenome"),
  }),
});

builder.objectField(MoreSample, "OtherName", (t) =>
  t.string({
    resolve: (parent) => "OTHER" + parent.moreSampleNome,
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

builder.queryField("firstMoreSample", (t) =>
  t.field({
    type: MoreSample,
    resolve: () =>
      new MoreSample(
        "60276866-df8b-4b67-8d9d-e311d7dffcba",
        "firstMoreSampleName",
        "firstMoreSampleLastName"
      ),
  })
);

builder.queryFields((t) => ({
  secondMoreExample: t.field({
    type: MoreSample,
    resolve: () =>
      new MoreSample(
        "secondMoreSampleId",
        "secondMoreSampleName",
        "secondMoreSampleLastName"
      ),
  }),
}));
