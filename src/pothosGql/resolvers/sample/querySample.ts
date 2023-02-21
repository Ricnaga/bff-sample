import { Sample } from "@/domain/sample/sampleDomain";
import { builder } from "@/pothosGql/builder";
import { SampleEnum } from "@/pothosGql/enum/sample/sampleEnum";
import { encodeGlobalID, decodeGlobalID } from "@pothos/plugin-relay";

const SampleInput = builder.inputType("SampleInput", {
  fields: (t) => ({
    name: t.id({ required: true }),
    sampleTipo: t.field({ type: SampleEnum }),
  }),
});

builder.objectType(Sample, {
  name: "Sample",
  description: "This is a Sample.",
  fields: (t) => ({
    uuid: t.globalID({
      resolve: (parent) => encodeGlobalID(Sample.name, parent.id),
    }),
    name: t.string({
      args: {
        input: t.arg({ type: SampleInput, required: true }),
      },
      resolve: (parent, { input }) => {
        const { id: name } = decodeGlobalID(input.name.toString());
        return `hello, ${name ?? "World"}`;
      },
    }),
    lastName: t.exposeString("sobrenome"),
  }),
});

builder.queryFields((t) => ({
  sample: t.field({
    type: Sample,
    resolve: () => new Sample("sampleId", "sampleName", "sampleLastName"),
  }),
}));
