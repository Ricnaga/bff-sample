import { Sample } from "@/domain/sample/sampleDomain";
import { type GraphQLContext } from "@/graphql/context";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class SampleResolver {
  @Query((returns) => [Sample])
  async getAllSample(@Ctx() ctx: GraphQLContext): Promise<Array<Sample>> {
    return ctx.adapters.microservice.sample();
  }
}
