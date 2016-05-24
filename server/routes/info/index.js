/* eslint camelcase: 0, no-process-env: 0 */

import os from 'os';

import packageInfo from '../../../package.json';
import express from 'express';

const router = express.Router();

export const factory = () => {
    router.get('/', function (req, res) {
        /**
         * Inspired by:
         * https://github.com/palmerabollo/express-ping
         */
        res.json({
          timestamp: Date.now(),
          uptime: process.uptime(),

          application: {
            name: packageInfo.name,
            version: packageInfo.version,
            pid: process.pid,
            title: process.title,
            argv: process.argv,
            versions: process.versions,
            node_env: process.env.NODE_ENV,
          },

          resources: {
            memory: process.memoryUsage(),
            loadavg: os.loadavg(),
            cpu: os.cpus(),
            nics: os.networkInterfaces(),
          },

          system: {
            arch: process.arch,
            platform: process.platform,
            type: os.type(),
            release: os.release(),
            hostname: os.hostname(),
            uptime: os.uptime(),
            cores: os.cpus().length,
            memory: os.totalmem(),
            },
        });
    });

    return router;
};
