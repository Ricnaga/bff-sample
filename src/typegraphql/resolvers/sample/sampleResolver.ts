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

@Resolver()
export class SampleResolver {
  private data: Sample;

  constructor(sample: Sample) {
    this.data = new Sample({ id: 'sample.id' });
  }

  @Query((returns) => Sample)
  async sample(): Promise<Sample> {
    return this.data;
  }
}
