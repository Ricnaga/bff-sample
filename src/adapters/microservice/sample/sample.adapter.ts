import { Sample } from "@/domain/sample/sampleDomain";
import { SampleDetails } from "@/domain/sample/sampleDetailsDomain";
import {
  getDetails,
  getSample,
} from "@/gateway/microservice/sample/sample.gateway";

export const sample = async (): Promise<Array<Sample>> =>
  getSample().then((response) => {
    return response.map((sample) => new Sample(sample));
  });

export const details = async (id: string): Promise<SampleDetails> =>
  getDetails(id).then((response) => new SampleDetails(response));
