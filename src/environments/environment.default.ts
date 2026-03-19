import packageJson from '../../package.json';

export const environment = {
  production: false,
  baseURL: 'http://localhost:3001',
  keycloak: {
    url: 'http://localhost:8080',
    realm: 'RssRealm',
    clientId: 'angular-app',
  },
  version: packageJson.version,
};
