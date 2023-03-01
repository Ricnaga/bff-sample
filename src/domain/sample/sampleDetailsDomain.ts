import { type SampleDetailsModel } from "@/gateway/sample/sample/models/sample.model";
import { DateBRScalar } from "@/typegraphql/scalar/DateBR";
import { ObjectType, Field, ID } from "type-graphql";
import { BaseDomain } from "../baseDomain";

@ObjectType()
export class SampleDetails extends BaseDomain {
  static readonly __typename = SampleDetails.name;

  @Field(type => ID!)
  readonly id: string;

  @Field(type => DateBRScalar)
  readonly dataCriacao: string;

  @Field(type => DateBRScalar)
  readonly dataModificacao: string;

  constructor(sampleDetailsModel: SampleDetailsModel) {
    super();
    this.id = SampleDetails.toGlobalId(sampleDetailsModel.id);
    this.dataCriacao = sampleDetailsModel.created_at;
    this.dataModificacao = sampleDetailsModel.updated_at;
  }
}