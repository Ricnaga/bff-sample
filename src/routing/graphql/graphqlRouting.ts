import { Environment } from "@/config";
import { logInfo, logError, logWarning } from "@/logger";
import { ApolloServer, BaseContext } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { koaMiddleware } from "@as-integrations/koa";
import { Server } from "http";
import Koa from "koa";
import { loggingPlugin } from "./graphqlPlugins";
import {
  createSubscriptionServer,
  destroySubscriptionServer,
} from "./graphqSubscription";

const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "world",
  },
};

export async function initGraphqlRouting(app: Koa, httpServer: Server) {
  const apolloServer = await createApolloServer(httpServer);
  app.use(koaMiddleware(apolloServer));
}

async function createApolloServer(
  httpServer: Server
): Promise<ApolloServer<BaseContext>> {
  const { serverCleanup } = await createSubscriptionServer(
    undefined,
    httpServer
  );

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: process.env.ENV !== Environment.Production,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      loggingPlugin,
      destroySubscriptionServer(serverCleanup),
    ],
    logger: {
      debug: logInfo("graphql", "debug"),
      info: logInfo("graphql"),
      error: logError("graphql"),
      warn: logWarning("graphql"),
    },
  });

  await apolloServer.start();
  return apolloServer;
}
