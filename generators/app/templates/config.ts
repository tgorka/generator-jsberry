const appConfig = {
    environment: process.env.NODE_ENV || 'dev',
    server: {
        port: process.env.PORT || 8081
    },
    mongo: {
        url: process.env.MONGO_DB_URI || process.env.MONGODB_URI || 'mongodb://localhost/vls'
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'jwt_secret',
        token: process.env.JWT_TOKEN || '' // could be usefull when communicating inside microservice infrastructure
    },
    seedDB: process.env.SEED_DB || false
};

if (appConfig.environment === 'dev') {
    appConfig.seedDB = true;
    appConfig.mongo.url = 'mongodb://heroku_user:host.mlab.com:55945/pass';
}

module.exports = appConfig;
