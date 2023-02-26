import axios from "axios";
import https from "https";

export const microserviceApiGateway = axios.create({
  baseURL: process.env.MICROSERVICE_SERVICE_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

microserviceApiGateway.interceptors.response.use((response) => ({
  ...response,
  deep: true,
}));

microserviceApiGateway.setAuthorization = (authorizationBearer: string) => {
  microserviceApiGateway.defaults.headers.common.Authorization =
    authorizationBearer;
};

export const MICROSERVICE_SAMPLE_SAMPLE_ENDPOINT = "/sample";
export const MICROSERVICE_SAMPLE_DETAILS_BYID_ENDPOINT = `${MICROSERVICE_SAMPLE_SAMPLE_ENDPOINT}_details/:id`;
