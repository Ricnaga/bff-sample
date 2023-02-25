import { rootPath } from "@/config";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers";

export const schema = await buildSchema({
  resolvers,
  container: ({ context }) => context,
  emitSchemaFile: rootPath("data", "schema.graphql"),
});
