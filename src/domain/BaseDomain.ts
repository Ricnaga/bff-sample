import { fromGlobalId, toGlobalId } from 'graphql-relay';

export class BaseDomain {
  static readonly __typename: string;

  static toGlobalId(id: string) {
    return toGlobalId(this.__typename, id);
  }

  static getModelId(id: string) {
    return fromGlobalId(id).id;
  }
}
