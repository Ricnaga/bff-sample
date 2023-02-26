import { SampleModel } from "@/gateway/microservice/sample/models/sample.model";

export class Sample  {
  static readonly __typename = Sample.name;

  readonly id: string;
  readonly nome: string;
  readonly sobrenome: string;

  constructor(sampleModel: SampleModel) {
    this.id = sampleModel.id;
    this.nome = sampleModel.name;
    this.sobrenome = sampleModel.lastName;
  }
}
