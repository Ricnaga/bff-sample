import { rootPath } from "@/config";
import { writeFileSync } from "fs";
import { printSchema, lexicographicSortSchema } from "graphql";
import { builder } from "./builder";

builder.queryType({})
builder.mutationType({})

import './resolvers'

export const schema = builder.toSchema();


const schemaAsString = printSchema(lexicographicSortSchema(schema));
writeFileSync(rootPath('data', 'schema.graphql'), schemaAsString);