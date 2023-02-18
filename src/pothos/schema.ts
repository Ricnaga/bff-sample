import SchemaBuilder from "@pothos/core";
import RelayPlugin from "@pothos/plugin-relay";

const builder = new SchemaBuilder({
  plugins: [RelayPlugin],
  relayOptions: {
    clientMutationId: "optional",
    cursorType: "String",
  }
});

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (parent, { name }) => `hello, ${name || 'World'}`,
    }),
  }),
});

export const schema = builder.toSchema();