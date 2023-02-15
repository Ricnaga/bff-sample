import { Environment } from '../config';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV: Environment;
      TZ: string;
    }
  }
}
