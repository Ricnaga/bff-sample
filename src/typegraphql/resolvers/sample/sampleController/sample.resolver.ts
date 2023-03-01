import { SampleDetails } from "@/domain/sample/sampleDetailsDomain";
import { Sample } from "@/domain/sample/sampleDomain";
import { type GraphQLContext } from "@/graphql/context";
import {
  Arg,
  Ctx,
  FieldResolver, Query,
  Resolver,
  Root
} from "type-graphql";

@Resolver((of) => Sample)
export class SampleResolver {
  @Query((returns) => [Sample])
  async getAllSample(@Ctx() ctx: GraphQLContext): Promise<Array<Sample>> {
    return ctx.adapters.sample.sample.sample();
  }

  @FieldResolver((returns) => SampleDetails)
  async details(
    @Root() sample: Sample,
    @Ctx() ctx: GraphQLContext
  ): Promise<SampleDetails> {
    return ctx.adapters.sample.sample.details(Sample.getModelId(sample.id));
  }

  @Query((returns) => SampleDetails)
  async getSampleDetails(
    @Arg("id", { nullable: true }) id: string,
    @Ctx() ctx: GraphQLContext
  ): Promise<SampleDetails> {
    const formattedId = id ?? Sample.getModelId("U2FtcGxlRGV0YWlsczpJRA==");
    return ctx.adapters.sample.sample.details(formattedId);
  }


}
