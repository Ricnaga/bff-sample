import { toGlobalId } from "graphql-relay";
import { Field, ObjectType, Query, Resolver } from "type-graphql";

@ObjectType()
class Sample {
  @Field()
  id: string;

  constructor(sample: Sample) {
    this.id = toGlobalId(Sample.name, sample.id);
  }
}

@Resolver(Sample)
export class SampleResolver {

  constructor(private sample: Sample) {}

  @Query((returns) => Sample)
  async getAllSample(): Promise<Sample> {
    return this.sample;
  }
}
