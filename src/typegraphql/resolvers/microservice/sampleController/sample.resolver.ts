import { Sample } from "@/domain/sample/sampleDomain";
import { SampleDetails } from "@/domain/sample/sampleDetailsDomain";
import { type GraphQLContext } from "@/graphql/context";
import { Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";

@Resolver((of) => Sample)
export class SampleResolver {
  @Query((returns) => [Sample])
  async getAllSample(@Ctx() ctx: GraphQLContext): Promise<Array<Sample>> {
    return ctx.adapters.microservice.sample();
  }

  @FieldResolver((returns) => SampleDetails)
  async getSampleDetails(
    @Root() sample: Sample,
    @Ctx() ctx: GraphQLContext
  ): Promise<SampleDetails> {
    return ctx.adapters.microservice.details(Sample.getModelId(sample.id));
  }
}
