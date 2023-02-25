import { type SampleModel } from "@/gateway/microservice/sample/models/sample.model";
import { toGlobalId } from "graphql-relay";

export class Sample {
  id: string;
  nome: string;
  sobrenome: string;

  constructor(sampleModel: SampleModel) {
    this.id = toGlobalId(Sample.name, sampleModel.id);
    this.nome = sampleModel.name;
    this.sobrenome = sampleModel.lastName;
  }
}
