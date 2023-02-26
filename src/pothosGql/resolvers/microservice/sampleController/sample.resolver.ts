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
      resolve: (root) => {
        return new SampleDetails({
          id: root.id,
          created_at: "created_at",
          updated_at: "updated_at",
        });
      },
    }),
  }),
});

builder.queryField("getAllSample", (t) =>
  t.field({
    type: [SampleTypeRef],
    resolve: () => [
      new Sample({
        id: "ID",
        name: "otherName",
        lastName: "otherLastName",
      }),
    ],
  })
);

builder.queryField("getSampleDetails", (t) =>
  t.field({
    type: SampleDetailsTypeRef,
    resolve: () =>
      new SampleDetails({
        id: "ID",
        created_at: "created_at",
        updated_at: "updated_at",
      }),
  })
);

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

const SampleCreateInput = builder
  .inputRef<{ nome: string }>("SampleCreateInput")
  .implement({
    fields: (t) => ({
      nome: t.string({ required: true }),
    }),
  });
const SampleDeleteInput = builder
  .inputRef<{ id: string }>("SampleDeleteInput")
  .implement({
    fields: (t) => ({
      id: t.string({ required: true }),
    }),
  });

const SampleUpdateInput = builder
  .inputRef<Record<"id" | "nome", string>>("SampleUpdateInput")
  .implement({
    fields: (t) => ({
      id: t.string({ required: true }),
      nome: t.string({ required: true }),
    }),
  });

builder.mutationField("createSampleUser", (t) =>
  t.field({
    type: SampleUserTypeRef,
    args: {
      input: t.arg({ type: SampleCreateInput, required: true }),
    },
    resolve: (root, args) =>
      new SampleUser({
        id: "id",
        name: args.input.nome,
        created_at: "created_at",
      }),
  })
);

builder.mutationField("removeSampleUser", (t) =>
  t.field({
    type: "ID",
    args: {
      input: t.arg({ type: SampleDeleteInput, required: true }),
    },
    resolve: (root, args) =>
      new SampleUser({
        id: args.input.id,
        name: "name",
        created_at: "created_at",
      }).id,
  })
);

builder.mutationField("updateSampleUser", (t) =>
  t.field({
    type: "ID",
    args: {
      input: t.arg({ type: SampleUpdateInput, required: true }),
    },
    resolve: (root, args) =>
      new SampleUser({
        id: args.input.id,
        name: args.input.nome,
        created_at: "created_at",
      }).id,
  })
);
