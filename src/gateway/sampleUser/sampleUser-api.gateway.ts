import axios from "axios";
import https from "https";

export const sampleUserApiGateway = axios.create({
  baseURL: process.env.SAMPLE_USER_SERVICE_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

sampleUserApiGateway.interceptors.response.use((response) => ({
  ...response,
  deep: true,
}));

sampleUserApiGateway.setAuthorization = (authorizationBearer: string) => {
  sampleUserApiGateway.defaults.headers.common.Authorization =
    authorizationBearer;
};

export const SAMPLE_USER_ENDPOINT = 'sample_user';
export const SAMPLE_USER_BYID_ENDPOINT = `${SAMPLE_USER_ENDPOINT}/:id`;
