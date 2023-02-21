import { builder } from "../builder";

builder.scalarType("Date", {
  description:'This is a Date Scalar',
  serialize: (date) => date,
  parseValue: (date) => new Date(),
  parseLiteral: (date) => new Date(),
});
