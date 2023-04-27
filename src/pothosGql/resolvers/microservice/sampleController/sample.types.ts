import { SampleDetails } from "@/domain/sample/sampleDetailsDomain";
import { Sample } from "@/domain/sample/sampleDomain";
import { SampleUser } from "@/domain/sample/sampleUserDomain";
import { builder } from "@/pothosGql/builder";
import { encodeGlobalID } from "@pothos/plugin-relay";

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

