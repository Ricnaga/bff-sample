import { Context as Ctx } from "koa";
import * as adapters from "@/adapters";

type Context = {
  ctx: Ctx;
};

export type GraphQLContext = Promise<{
  adapters: typeof adapters;
}>;

export const graphQLContext =
  () =>
  async ({ ctx: context }: Context): Promise<GraphQLContext> => {
    const { headers } = context.req;
    const authorizationBearer = headers.authorization ?? null;

    if (authorizationBearer) {
      return {
        adapters,
      };
    }

    return {
      adapters,
    };
  };
