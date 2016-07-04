import login from './api/login';
import user from './api/user';

import express from 'express';

const router = express.Router();

const routes = [login, user];

export const factory = (app) => {
    routes.forEach((routeFactory) => {
        router.use('/api/v1', routeFactory(app));
    });

    return router;
};
