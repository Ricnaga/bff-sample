import { type DetailsModel, type SampleModel } from "@/gateway/microservice/sample/models/sample.model";
import { ObjectType, Field } from "type-graphql";
import { BaseDomain } from "../baseDomain";

@ObjectType()
export class Sample extends BaseDomain {
  static readonly __typename = Sample.name;

  @Field()
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

@ObjectType()
export class Details extends BaseDomain {
  static readonly __typename = Details.name;

  @Field()
  readonly id: string;

  @Field()
  readonly dataCriacao: string;

  @Field()
  readonly dataModificacao: string;

  constructor(detailsModel: DetailsModel) {
    super();
    this.id = Details.toGlobalId(detailsModel.id);
    this.dataCriacao = detailsModel.created_at;
    this.dataModificacao = detailsModel.updated_at;
  }
}