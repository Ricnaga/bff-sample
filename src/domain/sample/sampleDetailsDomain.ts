import { type SampleDetailsModel } from "@/gateway/microservice/sample/models/sample.model";
import { ObjectType, Field } from "type-graphql";
import { BaseDomain } from "../baseDomain";

@ObjectType()
export class SampleDetails extends BaseDomain {
  static readonly __typename = SampleDetails.name;

  @Field()
  readonly id: string;

  @Field()
  readonly dataCriacao: string;

  @Field()
  readonly dataModificacao: string;

  constructor(sampleDetailsModel: SampleDetailsModel) {
    super();
    this.id = SampleDetails.toGlobalId(sampleDetailsModel.id);
    this.dataCriacao = sampleDetailsModel.created_at;
    this.dataModificacao = sampleDetailsModel.updated_at;
  }
}