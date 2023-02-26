import { SampleDetails } from "@/domain/sample/sampleDetailsDomain";
import { Sample } from "@/domain/sample/sampleDomain";
import { type GraphQLContext } from "@/graphql/context";
import { Arg, Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class SampleDetailsResolver {
  @Query((returns) => SampleDetails)
  async getSampleDetails(
    @Arg("id", { nullable: true }) id: string,
    @Ctx() ctx: GraphQLContext
  ): Promise<SampleDetails> {
    const formattedId = id ?? Sample.getModelId("U2FtcGxlRGV0YWlsczpJRA==")
    return ctx.adapters.microservice.details(formattedId);
  }
}
