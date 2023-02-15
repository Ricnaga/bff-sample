import 'axios';

declare module 'axios' {
  import { AxiosInstance as Instance } from 'axios';

  export interface AxiosInstance extends Instance {
    setAuthorization?: (authorizationBearer: string) => void;
  }
}
