import { SampleUser } from "@/domain/sample/sampleUserDomain";
import { builder } from "@/pothosGql/builder";
import { decodeGlobalID, encodeGlobalID } from "@pothos/plugin-relay";
import { SampleDetailsTypeRef, SampleTypeRef } from "./sample.types";


builder.queryFields((t) => ({
  sampleDetails: t.field({
    type: SampleDetailsTypeRef,
    args: {
      id: t.arg.id({
        required: true,
      }),
    },
    resolve: async (root, args, ctx) =>
      ctx.adapters.microservice.details(decodeGlobalID(args.id.toString()).id),
  }),
  samples: t.field({
    type: [SampleTypeRef],
    resolve: async (root, args, ctx) => ctx.adapters.microservice.sample(),
  }),
}));

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
