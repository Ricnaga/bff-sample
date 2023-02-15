import path from 'path';

export enum Environment {
  Development = 'development',
  Production = 'production',
}

export const rootPath = path.join.bind(path, __dirname, '..');
export const srcPath = rootPath.bind(path, 'src');
export const logsPath = rootPath.bind(path, 'logs');
