import { SampleUserModel } from "@/gateway/microservice/sample/models/sample.model";

export class SampleUser {
  static readonly __typename = SampleUser.name;

  readonly id: string;
  readonly nome: string;
  readonly dataCriacao: string;

  constructor(sampleUserModel: SampleUserModel) {
    this.id = sampleUserModel.id;
    this.nome = sampleUserModel.name;
    this.dataCriacao = sampleUserModel.created_at;
  }
}
