import { SampleUser } from "@/domain/sample/sampleUserDomain";
import { type GraphQLContext } from "@/graphql/context";
import {
  Arg,
  Ctx, Mutation, Resolver
} from "type-graphql";
import { SampleCreateInput, SampleRemoveInput, SampleUpdateInput } from "./sampleUser.input";

@Resolver()
export class SampleUserResolver {

  @Mutation((returns) => SampleUser)
  async createSampleUser(
    @Arg("input") input: SampleCreateInput,
    @Ctx() ctx: GraphQLContext
  ): Promise<SampleUser> {
    return ctx.adapters.sampleUser.sampleUser.create({
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
    await ctx.adapters.sampleUser.sampleUser.remove(input.id);
    return { id: input.id };
  }

  @Mutation((returns) => SampleUser)
  async updateSampleUser(
    @Arg("input") input: SampleUpdateInput,
    @Ctx() ctx: GraphQLContext
  ): Promise<{ id: string }> {
    await ctx.adapters.sampleUser.sampleUser.update(SampleUser.getModelId(input.id), input.nome);
    return { id: input.id };
  }
}
