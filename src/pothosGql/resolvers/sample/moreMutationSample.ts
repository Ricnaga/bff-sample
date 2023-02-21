import { Sample } from "@/domain/sample/sampleDomain";
import { builder } from "@/pothosGql/builder";

builder.relayMutationField(
  "relaySample",
  {
    inputFields: (t) => ({
      id: t.id({
        required: true,
      }),
      nome: t.string({
        required: false,
      }),
      sobrenome: t.string({
        required: false,
      }),
    }),
  },
  {
    resolve: async (root, args, ctx) => {
      return { sample: args.input };
    },
  },
  {
    outputFields: (t) => ({
      noGlobalID: t.field({
        type: Sample,
        resolve: (result) => {
          const { id, nome, sobrenome } = result.sample;
          return new Sample(
            id.toString(),
            nome?.toString() ?? "",
            sobrenome?.toString() ?? ""
          );
        },
      }),
    }),
  }
);
