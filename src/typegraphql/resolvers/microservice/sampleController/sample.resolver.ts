import { type GraphQLContext } from "@/graphql/context";
import { toGlobalId } from "graphql-relay";
import { Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";

@ObjectType()
class Sample {
  @Field()
  id: string;

  constructor(sample: Sample) {
    this.id = toGlobalId(Sample.name, sample.id);
  }
}

@Resolver()
export class SampleResolver {
  @Query((returns) => Sample)
  async getAllSample(@Ctx() ctx: GraphQLContext): Promise<Sample> {
    return new Sample({ id: (await ctx).adapters.index });
  }
}
