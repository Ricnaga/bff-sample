import { SampleUser } from "@/domain/sample/sampleUserDomain";
import { Length } from "class-validator";
import { Field, ID, InputType } from "type-graphql";

@InputType()
export class SampleCreateInput implements Partial<SampleUser> {
  @Field({ nullable: true })
  @Length(2)
  nome!: string;
}

@InputType()
export class SampleRemoveInput implements Partial<SampleUser> {
  @Field((type) => ID!, { nullable: true })
  @Length(2)
  id!: string;
}

@InputType()
export class SampleUpdateInput implements Partial<SampleUser> {
  @Field((type) => ID!, { nullable: true })
  @Length(2)
  id!: string;

  @Field((type) => String!, { nullable: true })
  @Length(2)
  nome!: string;
}
