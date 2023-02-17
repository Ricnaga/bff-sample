import { GraphQLSchema } from "graphql";
import { Disposable } from "graphql-ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { Server } from "http";
import { WebSocketServer } from "ws";

type GraphQLSubscriptionServer = {
  serverCleanup: Disposable;
};

type SubscriptionParams = {
  Authorization: string;
};

export async function createSubscriptionServer(
  schema: GraphQLSchema | undefined,
  server: Server
): Promise<GraphQLSubscriptionServer> {
  const wsServer = new WebSocketServer({
    server,
    path: "/graphql",
  });

  const serverCleanup = useServer<SubscriptionParams>(
    {
      schema,
    },
    wsServer
  );

  return { serverCleanup };
}

export function destroySubscriptionServer(subscriptionServer: Disposable) {
  return {
    async serverWillStart() {
      return {
        async drainServer() {
          await subscriptionServer.dispose();
        },
      };
    },
  };
}
