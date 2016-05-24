/**
 * Core dependencies
 */
import express from 'express';
import config from 'config';

/**
 * As we are customising functionallity of `winston` logger
 * thus we want to import this module instead of importing `winstons` directly
 */
import logger from './utils/logger';

/**
 * Models are shared with client
 */
import models from './models';

/**
 * Routing & middleware
 */
import routes from './routes';
import middleware from './middleware';
import bootstrap from './bootstrap';

/**
 * Websocket events and messages
 */
import websocket from './websocket';

/**
 * Initialize Express.js server instance
 */
const app = express();

/**
 * Expose `config` & `logger` instances to application
 */
app.config = config;
app.log = logger();

/**
 * Models have to be initialized before routing is invoked
 */
models.waterline.initialize(config.get('waterline'), (err, models) => {

    if(err) {
        throw err;
    }

    /**
     * Expose Waterline `collections` and `connections` for app object
     */
	app.models = models.collections;
	app.connections = models.connections;

    /**
     * Initialze routes & middleware for oure instance of Express server
     */
    middleware(app);
    routes(app);

    /**
     * Comparing to `routes` & `middleware`, bootstraped features
     * can be async, handle them with promises then
     */
    bootstrap(app)
        .then(() => {
             const server = app.listen(config.get('port'));
             app.log('info', 'Listening at port %s', config.get('port'));

             /* Initialize websocket server */
             websocket(server);
        })
        .catch((e) => {
            /* @TODO: think about better error output, red color perhaps? */
            app.log('info', ('FATAL, ' + e));
        });
});

export default app;
