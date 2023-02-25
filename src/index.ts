import 'reflect-metadata'
import './config';
import cors from '@koa/cors';
import http from 'http';
import Koa from 'koa';
import bodyParser from "koa-bodyparser";
import loggerMiddleware from 'koa-logger';
import { createApolloServer } from './graphql/routing';
import { log } from './logger';

const app = new Koa();
const httpServer = http.createServer(app.callback());

app.use(cors());
app.use(bodyParser());
app.use(loggerMiddleware());

createApolloServer(app, httpServer);

httpServer.listen(process.env.PORT, () => log(`Server running on ${process.env.PORT}`));
