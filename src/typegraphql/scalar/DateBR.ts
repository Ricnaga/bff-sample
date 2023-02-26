import { GraphQLScalarType } from "graphql";

export const DateBRScalar = new GraphQLScalarType({
  name: "DateBR",
  description: "Brazillian Date",
  serialize: (value: string): string => {
    return new Date(value).toLocaleDateString("pt-br",  {
      year: 'numeric',
      month: 'numeric',
      weekday: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  },
});
