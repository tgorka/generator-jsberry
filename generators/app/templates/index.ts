require('source-map-support').install();

import * as mongoose from "mongoose";

const express = require('express');
//const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const bluebird = require('bluebird');
const jwt = require('express-jwt');
const permissions = require('express-jwt-permissions')();

const mongooseErrorHandler = require('mongoose-error-handler');

const config = require('./config');
const routes = require('./routes');

const app = express();

//mongoose.Promise = bluebird;
(<any>mongoose).Promise = bluebird;
mongoose.connect(config.mongo.url);

app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use('/', jwt({secret: config.jwt.secret}), permissions.check("admin"), routes);

// Populate databases with sample data
if(config.seedDB) {
    require('./seed');
}


process.on('unhandledRejection', r => console.log(r));

app.use(function (err, req, res, next) {
    if (err.status === 401 || err.status === 403) {
        // auth, permission errors
        res.status(err.status).send({error: err.name, code: err.code, message: err.message});
    } else if (err.name === 'ValidationError') {
        // validation errors
        res.status(422).send(mongooseErrorHandler.set(err, req.t)); // req.t for i18n error messages
    } else {
        // internal server error
        console.log('ERROR', err.message);
        console.log(err);
        res.status(500).send({error: err.name, message: err.message});
    }
});

app.listen(config.server.port, () => {
    console.log(`Magic happens on port ${config.server.port}`);
});

module.exports = app;
