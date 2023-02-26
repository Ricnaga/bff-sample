import { SampleDetails } from "@/domain/sample/sampleDetailsDomain";
import { Sample } from "@/domain/sample/sampleDomain";
import { SampleUser } from "@/domain/sample/sampleUserDomain";
import { SampleUserModel } from "@/gateway/microservice/sample/models/sample.model";
import {
  deleteUser,
  getDetails,
  getSample,
  postUser,
  updateUser,
} from "@/gateway/microservice/sample/sample.gateway";

export const sample = async (): Promise<Array<Sample>> =>
  getSample().then((response) => {
    return response.map((sample) => new Sample(sample));
  });

export const details = async (id: string): Promise<SampleDetails> =>
  getDetails(id).then((response) => new SampleDetails(response));

export const create = async (input: SampleUserModel): Promise<SampleUser> =>
  postUser(input).then((response) => new SampleUser(response));

export const remove = async (id: string): Promise<void> => deleteUser(id);

export const update = async (id: string, nome: string): Promise<void> =>
  updateUser(id, nome);
