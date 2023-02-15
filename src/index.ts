import './config';
import cors from '@koa/cors';
import http from 'http';
import Koa from 'koa';
import bodyParser from "koa-bodyparser";
import loggerMiddleware from 'koa-logger';
import { log } from './logger';
import { initGraphqlRouting } from './routing/graphql/graphqlRouting';

const app = new Koa();
const httpServer = http.createServer(app.callback());

app.use(cors());
app.use(bodyParser());
app.use(loggerMiddleware());

initGraphqlRouting(app, httpServer);

httpServer.listen(process.env.PORT, () => log(`Server running on ${process.env.PORT}`));
