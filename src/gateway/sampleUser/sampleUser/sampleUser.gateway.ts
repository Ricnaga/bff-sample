import { logError, logInfo } from "@/logger";
import { catchStatusCodeError } from "../../api/errorHandling";
import {
  SampleUserModel,
} from "./models/sampleUser.model";
import {
  sampleUserApiGateway,
  SAMPLE_USER_ENDPOINT,
  SAMPLE_USER_BYID_ENDPOINT,
} from "../sampleUser-api.gateway";

export enum SAMPLE_USER_ERRORS {
  SOMETHING_WENT_WRONG = "SAMPLE_USER_ERROR_SOMETHING_WENT_WRONG",
  EMPTY_CREDENTIALS = "SAMPLE_USER_ERROR_EMPTY_CREDENTIALS",
  INVALID_CREDENTIALS = "SAMPLE_USER_ERROR_INVALID_CREDENTIALS",
  NOT_ACCEPTABLE = "SAMPLE_USER_ERROR_NOT_ACCEPTABLE",
  SERVICE_UNAVAILABLE = "SAMPLE_USER_ERROR_SERVICE_UNAVAILABLE",
}

type PostUserRequest = SampleUserModel;

export async function postUser(
  body: PostUserRequest
): Promise<SampleUserModel> {
  return sampleUserApiGateway
    .post<SampleUserModel>(SAMPLE_USER_ENDPOINT, body)
    .then((response) => response.data)
    .then(logInfo("MICROSERVICE_SAMPLE", "postUser"))
    .catch(logError("MICROSERVICE_SAMPLE", "postUser"))
    .catch(
      catchStatusCodeError({
        500: SAMPLE_USER_ERRORS.SOMETHING_WENT_WRONG,
        503: SAMPLE_USER_ERRORS.SERVICE_UNAVAILABLE,
      })
    );
}

export async function deleteUser(id: string): Promise<void> {
  return sampleUserApiGateway
    .delete<void>(SAMPLE_USER_BYID_ENDPOINT.replace(":id", id))
    .then((response) => response.data)
    .then(logInfo("MICROSERVICE_SAMPLE", "deleteUser"))
    .catch(logError("MICROSERVICE_SAMPLE", "deleteUser"))
    .catch(
      catchStatusCodeError({
        500: SAMPLE_USER_ERRORS.SOMETHING_WENT_WRONG,
        503: SAMPLE_USER_ERRORS.SERVICE_UNAVAILABLE,
      })
    );
}

export async function updateUser(id: string, body: string): Promise<void> {
  return sampleUserApiGateway
    .put<void>(SAMPLE_USER_BYID_ENDPOINT.replace(":id", id), {
      name: body,
    })
    .then((response) => response.data)
    .then(logInfo("MICROSERVICE_SAMPLE", "updateUser"))
    .catch(logError("MICROSERVICE_SAMPLE", "updateUser"))
    .catch(
      catchStatusCodeError({
        500: SAMPLE_USER_ERRORS.SOMETHING_WENT_WRONG,
        503: SAMPLE_USER_ERRORS.SERVICE_UNAVAILABLE,
      })
    );
}
