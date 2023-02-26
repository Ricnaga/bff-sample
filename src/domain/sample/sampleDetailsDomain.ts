import { SampleDetailsModel } from "@/gateway/microservice/sample/models/sample.model";

export class SampleDetails {
  static readonly __typename = SampleDetails.name;

  readonly id: string;
  readonly dataCriacao: string;
  readonly dataModificacao: string;

  constructor(sampleDetailsModel: SampleDetailsModel) {
    this.id = sampleDetailsModel.id;
    this.dataCriacao = sampleDetailsModel.created_at;
    this.dataModificacao = sampleDetailsModel.updated_at;
  }
}
