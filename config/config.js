var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'rapidocteur-client-less'
    },
    port: 8082,
    api: 'http://0.0.0.0:88/api',
    proxyApi: 'http://0.0.0.0:8080'
  },

  test: {
    root: rootPath,
    app: {
      name: 'rapidocteur-client-less'
    },
    port: 9002
  },

  production: {
    root: rootPath,
    app: {
      name: 'rapidocteur-client-less'
    },
    port: process.env.PORT || 9002,
    api: 'http://rapidocteur.fr/api'
  }
};

module.exports = config[env];
