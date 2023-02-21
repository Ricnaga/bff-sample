import { rootPath } from "@/config";
import { buildSchema } from "type-graphql";
import { SampleResolver } from "./resolvers";

export const schema = await buildSchema({
  resolvers: [SampleResolver],
  emitSchemaFile: rootPath("data", "schema.graphql"),
});
