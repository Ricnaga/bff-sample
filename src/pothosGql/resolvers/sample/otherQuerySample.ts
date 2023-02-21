import { OtherSample } from "@/domain/sample/otherSampleDomain";
import { builder } from "@/pothosGql/builder";
import { encodeGlobalID } from "@pothos/plugin-relay";

export const OtherSampleRef = builder
  .objectRef<OtherSample>(OtherSample.name)
  .implement({
    fields: (t) => ({
      id: t.globalID({
        resolve: (parent) =>
          encodeGlobalID(OtherSample.name, parent.otherSampleId),
      }),
      nome: t.exposeString("otherSampleNome"),
      sobrenome: t.exposeString("otherSampleSobrenome"),
    }),
  });

builder.queryField("otherSample", (t) =>
  t.field({
    type: OtherSampleRef,
    resolve: () => new OtherSample("otherID", "otherName", "otherLastName"),
  })
);
