import { Sample } from "@/domain/sample/sampleDomain";
import { SampleDetails } from "@/domain/sample/sampleDetailsDomain";
import { type GraphQLContext } from "@/graphql/context";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { SampleCreateInput, SampleRemoveInput, SampleUpdateInput } from "./sample.input";
import { SampleUser } from "@/domain/sample/sampleUserDomain";

@Resolver((of) => Sample)
export class SampleResolver {
  @Query((returns) => [Sample])
  async getAllSample(@Ctx() ctx: GraphQLContext): Promise<Array<Sample>> {
    return ctx.adapters.microservice.sample();
  }

  @FieldResolver((returns) => SampleDetails)
  async details(
    @Root() sample: Sample,
    @Ctx() ctx: GraphQLContext
  ): Promise<SampleDetails> {
    return ctx.adapters.microservice.details(Sample.getModelId(sample.id));
  }

  @Query((returns) => SampleDetails)
  async getSampleDetails(
    @Arg("id", { nullable: true }) id: string,
    @Ctx() ctx: GraphQLContext
  ): Promise<SampleDetails> {
    const formattedId = id ?? Sample.getModelId("U2FtcGxlRGV0YWlsczpJRA==");
    return ctx.adapters.microservice.details(formattedId);
  }

  @Mutation((returns) => SampleUser)
  async createSampleUser(
    @Arg("input") input: SampleCreateInput,
    @Ctx() ctx: GraphQLContext
  ): Promise<SampleUser> {
    return ctx.adapters.microservice.create({
      id: 'ID',
      name: input.nome,
      created_at: new Date().toISOString(),
    });
  }

  @Mutation((returns) => SampleUser)
  async removeSampleUser(
    @Arg("input") input: SampleRemoveInput,
    @Ctx() ctx: GraphQLContext
  ): Promise<{ id: string }> {
    await ctx.adapters.microservice.remove(input.id);
    return { id: input.id };
  }

  @Mutation((returns) => SampleUser)
  async updateSampleUser(
    @Arg("input") input: SampleUpdateInput,
    @Ctx() ctx: GraphQLContext
  ): Promise<{ id: string }> {
    await ctx.adapters.microservice.update(SampleUser.getModelId(input.id), input.nome);
    return { id: input.id };
  }
}
