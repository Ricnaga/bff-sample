import { Sample } from "@/domain/sample/sampleDomain";
import { getSample } from "@/gateway/microservice/sample/sample.gateway";

export const sample = async (): Promise<Array<Sample>> =>
  getSample().then((response) => {
    return response.map(sample => new Sample(sample));
  });
