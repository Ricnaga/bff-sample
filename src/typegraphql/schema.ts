import { rootPath } from "@/config";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers";

export const schema = await buildSchema({
  resolvers,
  emitSchemaFile: rootPath("data", "schema.graphql"),
  dateScalarMode: "isoDate",
});
