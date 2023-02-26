import { type SampleModel } from "@/gateway/microservice/sample/models/sample.model";
import { ObjectType, Field, ID } from "type-graphql";
import { BaseDomain } from "../baseDomain";

@ObjectType()
export class Sample extends BaseDomain {
  static readonly __typename = Sample.name;

  @Field(type => ID!)
  readonly id: string;

  @Field()
  readonly nome: string;

  @Field()
  readonly sobrenome: string;

  constructor(sampleModel: SampleModel) {
    super();
    this.id = Sample.toGlobalId(sampleModel.id);
    this.nome = sampleModel.name;
    this.sobrenome = sampleModel.lastName;
  }
}