import { Details, Sample } from "@/domain/sample/sampleDomain";
import {
  getDetails,
  getSample,
} from "@/gateway/microservice/sample/sample.gateway";

export const sample = async (): Promise<Array<Sample>> =>
  getSample().then((response) => {
    return response.map((sample) => new Sample(sample));
  });

export const details = async (id: string): Promise<Details> =>
  getDetails(id).then((response) => new Details(response));
