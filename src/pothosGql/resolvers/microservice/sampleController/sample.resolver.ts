import { SampleDetails } from "@/domain/sample/sampleDetailsDomain";
import { Sample } from "@/domain/sample/sampleDomain";
import { SampleUser } from "@/domain/sample/sampleUserDomain";
import { builder } from "@/pothosGql/builder";
import { decodeGlobalID, encodeGlobalID } from "@pothos/plugin-relay";

export const SampleDetailsTypeRef = builder
  .objectRef<SampleDetails>(SampleDetails.name)
  .implement({
    fields: (t) => ({
      id: t.globalID({
        resolve: (parent) => encodeGlobalID(SampleDetails.name, parent.id),
      }),
      dataCriacao: t.exposeString("dataCriacao"),
      dataModificacao: t.exposeString("dataModificacao"),
    }),
  });

export const SampleTypeRef = builder.objectRef<Sample>(Sample.name).implement({
  fields: (t) => ({
    id: t.globalID({
      resolve: (parent) => encodeGlobalID(Sample.name, parent.id),
    }),
    nome: t.exposeString("id"),
    sobrenome: t.exposeString("nome"),
    details: t.field({
      type: SampleDetailsTypeRef,
      resolve: async (root, args, ctx) =>
        ctx.adapters.microservice.details(root.id),
    }),
  }),
});

builder.queryFields((t) => ({
  getSampleDetails: t.field({
    type: SampleDetailsTypeRef,
    args: {
      id: t.arg.id({
        required: true,
      }),
    },
    resolve: async (root, args, ctx) =>
      ctx.adapters.microservice.details(decodeGlobalID(args.id.toString()).id),
  }),
  getAllSample: t.field({
    type: [SampleTypeRef],
    resolve: async (root, args, ctx) => ctx.adapters.microservice.sample(),
  }),
}));

export const SampleUserTypeRef = builder
  .objectRef<SampleUser>(SampleUser.name)
  .implement({
    fields: (t) => ({
      id: t.globalID({
        resolve: (parent) => encodeGlobalID(SampleUser.name, parent.id),
      }),
      nome: t.exposeString("nome"),
      dataCriacao: t.exposeString("dataCriacao"),
    }),
  });

builder.relayMutationField(
  "createSampleUser",
  {
    inputFields: (t) => ({
      nome: t.string({
        required: true,
      }),
    }),
  },
  {
    resolve: async (root, args, ctx) =>
      ctx.adapters.microservice.create({
        id: encodeGlobalID(SampleUser.name, "ID"),
        name: args.input.nome,
        created_at: new Date().toISOString(),
      }),
  },
  {
    outputFields: (t) => ({
      id: t.globalID({
        resolve: (parent) => encodeGlobalID(SampleUser.name, parent.id),
      }),
    }),
  }
);

builder.relayMutationField(
  "removeSampleUser",
  {
    inputFields: (t) => ({
      id: t.id({
        required: true,
      }),
    }),
  },
  {
    resolve: async (root, args, ctx) => {
      await ctx.adapters.microservice.remove(
        decodeGlobalID(args.input.id.toString()).id
      );

      return {
        id: args.input.id,
      };
    },
  },
  {
    outputFields: (t) => ({
      id: t.exposeID("id"),
    }),
  }
);

builder.relayMutationField(
  "updateSampleUser",
  {
    inputFields: (t) => ({
      id: t.id({
        required: true,
      }),
      nome: t.string({
        required: true,
      }),
    }),
  },
  {
    resolve: async (root, args, ctx) => {
      await ctx.adapters.microservice.update(
        decodeGlobalID(args.input.id.toString()).id,
        args.input.nome
      );
      return {
        id: args.input.id,
      };
    },
  },
  {
    outputFields: (t) => ({
      id: t.exposeID("id"),
    }),
  }
);
