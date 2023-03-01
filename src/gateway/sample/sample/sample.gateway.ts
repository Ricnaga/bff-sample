import { logError, logInfo } from "@/logger";
import { catchStatusCodeError } from "../../api/errorHandling";
import {
  sampleApiGateway, SAMPLE_DETAILS_BYID_ENDPOINT, SAMPLE_SAMPLE_ENDPOINT
} from "../sample-api.gateway";
import {
  SampleDetailsModel,
  SampleModel
} from "./models/sample.model";

export enum SAMPLE_ERRORS {
  SOMETHING_WENT_WRONG = "SAMPLE_ERROR_SOMETHING_WENT_WRONG",
  EMPTY_CREDENTIALS = "SAMPLE_ERROR_EMPTY_CREDENTIALS",
  INVALID_CREDENTIALS = "SAMPLE_ERROR_INVALID_CREDENTIALS",
  NOT_ACCEPTABLE = "SAMPLE_ERROR_NOT_ACCEPTABLE",
  SERVICE_UNAVAILABLE = "SAMPLE_ERROR_SERVICE_UNAVAILABLE",
}

export async function getSample(): Promise<Array<SampleModel>> {
  return sampleApiGateway
    .get<Array<SampleModel>>(SAMPLE_SAMPLE_ENDPOINT)
    .then((response) => response.data)
    .then(logInfo("SAMPLE", "getSample"))
    .catch(logError("SAMPLE", "getSample"))
    .catch(
      catchStatusCodeError({
        500: SAMPLE_ERRORS.SOMETHING_WENT_WRONG,
        503: SAMPLE_ERRORS.SERVICE_UNAVAILABLE,
      })
    );
}

export async function getDetails(id: string): Promise<SampleDetailsModel> {
  return sampleApiGateway
    .get<SampleDetailsModel>(
      SAMPLE_DETAILS_BYID_ENDPOINT.replace(":id", id)
    )
    .then((response) => response.data)
    .then(logInfo("SAMPLE", "getDetails"))
    .catch(logError("SAMPLE", "getDetails"))
    .catch(
      catchStatusCodeError({
        500: SAMPLE_ERRORS.SOMETHING_WENT_WRONG,
        503: SAMPLE_ERRORS.SERVICE_UNAVAILABLE,
      })
    );
}

