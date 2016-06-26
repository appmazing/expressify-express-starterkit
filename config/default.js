/* eslint no-process-env: 0 */

import mongo from 'sails-mongo';
import memory from 'sails-memory';

import path from 'path';

const rootDirectory = process.cwd();

export default {
    port: 5001,
    staticDir: path.join(rootDirectory, 'static'),

    /* default superadmin credentials */
    superadmin: {
        name: 'superadmin',
        email: 'admin@foo.bar',
        password: 'test',
        roles: ['admin'],
    },

    fixtures: {
        path: path.join(rootDirectory, 'fix'),

        /* if true, fixtures bootstrap module will wipe collection first */
        reset: true,
    },

    auth: {
        jwt: {
            expiresIn: (20 * 60),
            secret: 'B8FAA2E0A1606C16B66CDCB1EFA0E389773F47859BECD24181ECB32EE49A9203',
        },
        cookie: {
            name: 'Authorization',
            httpOnly: true,
            domain: '.mydomain.com',
            path: '/',
        },
    },

    waterline: {
        adapters: {
            mongo,
            memory,
        },
        connections: {
            mongo: {
                adapter: 'mongo',
                port: 27017,
                database: 'production-db',
            },
        },
    },

    cors: {
        origin: true,
        credentials: true,
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    },

    bodyParser: {
        json: {
            limit : '100kb',
        },
        urlencoded: {
            extended: false,
        },
    },

    /**
     * Things to be executed during application bootstrapping.
     *  - name of module,
     *  - priority (higher better)
     *
     * @example { name: 'module', priority: 1 } will run `module` immediately
     */
    bootstrap: [
        /* run before server start */
        { name: 'waterline', priority: 10 },

        /* initialze routes & middleware for oure instance of Express server */
        { name: 'middleware', priority: 20 },
        { name: 'routes', priority: 20 },

        /* less important, still start before server initialisation */
        { name: 'superadmin', priority: 30 },
        { name: 'fixtures', priority: 30 },

        /* initialise server (start listening on given port etc.) */
        { name: 'server', priority: 40 },

        /* run after server will start */
        { name: 'websockets', priority: 50 },
    ],

    /**
     * Middleware to be enabled, provide object with:
     *  - name of module,
     *  - priority (higher better)
     *
     * @example { name: 'module', priority: 1 } will run `module` middleware ASAP
     */
    middleware: [
        { name: 'static', priority: 8 },
        { name: 'cookie-parser', priority: 8 },
        { name: 'body-parser-json', priority: 8 },
        { name: 'body-parser-urlencoded', priority: 8 },
        { name: 'jwt-parse', priority: 10 },
        { name: 'auth', priority: 20 },
        { name: 'cache-response', priority: 50 },
        { name: 'cors', priority: 50 },
    ],

    tests: {
        integration: {
            path: path.join('tests', 'integration', '**', '*.js'),
            ignore: '**/index.js',
        },
    },
};
