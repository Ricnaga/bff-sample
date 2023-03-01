import { SampleUser } from "@/domain/sample/sampleUserDomain";
import { SampleUserModel } from "@/gateway/sampleUser/sampleUser/models/sampleUser.model";
import {
  deleteUser,
  postUser,
  updateUser
} from "@/gateway/sampleUser/sampleUser/sampleUser.gateway";

export const create = async (input: SampleUserModel): Promise<SampleUser> =>
  postUser(input).then((response) => new SampleUser(response));

export const remove = async (id: string): Promise<void> => deleteUser(id);

export const update = async (id: string, nome: string): Promise<void> =>
  updateUser(id, nome);
