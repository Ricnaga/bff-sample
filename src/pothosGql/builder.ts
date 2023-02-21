import SchemaBuilder from "@pothos/core";
import RelayPlugin from "@pothos/plugin-relay";

type PothosSchemaType = {
  Scalars: {
    Date: Record<"Input" | "Output", Date>;
  };
};

export const builder = new SchemaBuilder<PothosSchemaType>({
  plugins: [RelayPlugin],
  relayOptions: {
    clientMutationId: "optional",
    cursorType: "String",
  },
});
