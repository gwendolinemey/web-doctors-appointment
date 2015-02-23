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
  },

  test: {
    root: rootPath,
    app: {
      name: 'rapidocteur-client-less'
    },
    port: 9002,
  },

  production: {
    root: rootPath,
    app: {
      name: 'rapidocteur-client-less'
    },
    port: process.env.PORT || 9002,
  }
};

module.exports = config[env];
