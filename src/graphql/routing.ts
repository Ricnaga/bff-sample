import { Environment } from "@/config";
import { logError, logInfo, logWarning } from "@/logger";
import { schema } from "@/typegraphql/schema";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { koaMiddleware } from "@as-integrations/koa";
import { Server } from "http";
import Koa from "koa";
import { GraphQLContext, graphQLContext } from "./context";
import { loggingPlugin } from "./plugins";
import {
  createSubscriptionServer,
  destroySubscriptionServer,
} from "./subscriptionServer";

export async function initGraphqlRouting(app: Koa, httpServer: Server) {
  const apolloServer = await createApolloServer(httpServer);
  app.use(
    koaMiddleware(apolloServer, {
      context: graphQLContext(),
    })
  );
}

async function createApolloServer(
  httpServer: Server
): Promise<ApolloServer<GraphQLContext>> {
  const { serverCleanup } = await createSubscriptionServer(schema, httpServer);

  const apolloServer = new ApolloServer<GraphQLContext>({
    schema,
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
