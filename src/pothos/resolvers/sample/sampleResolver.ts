import { Sample } from "@/domain/sample/sampleDomain";
import { builder } from "@/pothos/builder";

const SampleInput = builder.inputType("SampleInput", {
  fields: (t) => ({
    name: t.string(),
  }),
});

builder.objectType(Sample, {
  name: "Sample",
  description: "This is a Sample.",
  fields: (t) => ({
    uuid: t.exposeString("id"),
    name: t.string({
      args: {
        input: t.arg({ type: SampleInput, required: true }),
      },
      resolve: (parent, { input }) => `hello, ${input.name || "World"}`,
    }),
    lastName: t.exposeString("sobrenome"),
  }),
});

builder.queryFields((t) => ({
  sample: t.field({
    type: Sample,
    resolve: () => new Sample("sampleId", "sampleName", "sampleLastName"),
  }),
}))

