import { logError, logInfo } from "@/logger";
import { catchStatusCodeError } from "../../api/errorHandling";
import { SampleDetailsModel, SampleModel } from "./models/sample.model";
import {
  microserviceApiGateway,
  MICROSERVICE_SAMPLE_SAMPLE_ENDPOINT,
  MICROSERVICE_SAMPLE_DETAILS_BYID_ENDPOINT,
} from "../microservice-api.gateway";

export enum MICROSERVICE_SAMPLE_ERRORS {
  SOMETHING_WENT_WRONG = "MICROSERVICE_SAMPLE_ERROR_SOMETHING_WENT_WRONG",
  EMPTY_CREDENTIALS = "MICROSERVICE_SAMPLE_ERROR_EMPTY_CREDENTIALS",
  INVALID_CREDENTIALS = "MICROSERVICE_SAMPLE_ERROR_INVALID_CREDENTIALS",
  NOT_ACCEPTABLE = "MICROSERVICE_SAMPLE_ERROR_NOT_ACCEPTABLE",
  SERVICE_UNAVAILABLE = "MICROSERVICE_SAMPLE_ERROR_SERVICE_UNAVAILABLE",
}

export async function getSample(): Promise<Array<SampleModel>> {
  return microserviceApiGateway
    .get<Array<SampleModel>>(MICROSERVICE_SAMPLE_SAMPLE_ENDPOINT)
    .then((response) => response.data)
    .then(logInfo("MICROSERVICE_SAMPLE", "getSample"))
    .catch(logError("MICROSERVICE_SAMPLE", "getSample"))
    .catch(
      catchStatusCodeError({
        500: MICROSERVICE_SAMPLE_ERRORS.SOMETHING_WENT_WRONG,
        503: MICROSERVICE_SAMPLE_ERRORS.SERVICE_UNAVAILABLE,
      })
    );
}

export async function getDetails(id: string): Promise<SampleDetailsModel> {
  return microserviceApiGateway
    .get<SampleDetailsModel>(
      MICROSERVICE_SAMPLE_DETAILS_BYID_ENDPOINT.replace(":id", id)
    )
    .then((response) => response.data)
    .then(logInfo("MICROSERVICE_SAMPLE", "getDetails"))
    .catch(logError("MICROSERVICE_SAMPLE", "getDetails"))
    .catch(
      catchStatusCodeError({
        500: MICROSERVICE_SAMPLE_ERRORS.SOMETHING_WENT_WRONG,
        503: MICROSERVICE_SAMPLE_ERRORS.SERVICE_UNAVAILABLE,
      })
    );
}
