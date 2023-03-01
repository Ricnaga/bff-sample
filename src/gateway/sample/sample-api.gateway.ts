import axios from "axios";
import https from "https";

export const sampleApiGateway = axios.create({
  baseURL: process.env.SAMPLE_SERVICE_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

sampleApiGateway.interceptors.response.use((response) => ({
  ...response,
  deep: true,
}));

sampleApiGateway.setAuthorization = (authorizationBearer: string) => {
  sampleApiGateway.defaults.headers.common.Authorization =
    authorizationBearer;
};

export const SAMPLE_SAMPLE_ENDPOINT = "/sample";
export const SAMPLE_DETAILS_BYID_ENDPOINT = `${SAMPLE_SAMPLE_ENDPOINT}_details/:id`;
