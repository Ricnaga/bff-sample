import { Sample } from "@/domain/sample/sampleDomain";
import { type GraphQLContext } from "@/graphql/context";
import { Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";

@ObjectType()
export class SampleType implements Sample {
  @Field()
  id: string = "id";

  @Field()
  nome: string = "nome";

  @Field()
  sobrenome: string = "sobrenome";
}

@Resolver()
export class SampleResolver {
  @Query((returns) => SampleType)
  async getAllSample(@Ctx() ctx: GraphQLContext): Promise<Array<Sample>> {
    return ctx.adapters.microservice.sample();
  }
}
