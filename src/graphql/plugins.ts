import { ApolloServerPlugin } from '@apollo/server';

export const loggingPlugin: ApolloServerPlugin = {
  async requestDidStart(context) {
    if (context.request.operationName === 'IntrospectionQuery') {
      return {};
    }

    context.logger.debug(context.request.query);

    return {
      async didEncounterErrors(requestContext) {
        (requestContext.errors || []).forEach((error) => {
          requestContext.logger.error(error);
        });
      },
      async willSendResponse(requestContext) {
        if (requestContext.response) {
          requestContext.logger.info(
            JSON.stringify(requestContext.response.body),
          );
        }
      },
    };
  },
};
