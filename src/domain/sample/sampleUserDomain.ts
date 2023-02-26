import { type SampleUserModel } from "@/gateway/microservice/sample/models/sample.model";
import { DateBRScalar } from "@/typegraphql/scalar/DateBR";
import { ObjectType, Field, ID } from "type-graphql";
import { BaseDomain } from "../baseDomain";

@ObjectType()
export class SampleUser extends BaseDomain {
  static readonly __typename = SampleUser.name;

  @Field(type => ID!)
  readonly id: string;

  @Field()
  readonly nome: string;

  @Field(type => DateBRScalar)
  readonly dataCriacao:string


  constructor(sampleUserModel: SampleUserModel) {
    super();
    this.id = SampleUser.toGlobalId(sampleUserModel.id);
    this.nome = sampleUserModel.name;
    this.dataCriacao = sampleUserModel.created_at;
  }
}