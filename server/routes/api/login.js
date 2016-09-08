import express from 'express';
import jwt from 'jsonwebtoken';

import { authenticate } from '../../utils/auth';

export const api = 'v1';
export const name = 'login';

const router = express.Router();

export const factory = (app) => {

    const { models, locals: config } = app;

	router.route('/')

		/**
		 * @param  {Object} req
		 * @param  {Object} res
		 * @return {Void}
		 */
		.post((req, res) => {

            let { username, password } = req.body;

            models.user.findOne({ email: username }, (err, user) => {
				if (err) {
					return res.send(err);
				}

				if (!authenticate({ user, password }, 'password')) {
					return res.sendStatus(401);
				}

				let token = jwt.sign(user, config.get('auth.jwt.secret'), {
					expiresIn: config.get('auth.jwt.expiresIn'),
				});

                res.cookie('Authorization', token, app.locals.get('auth.cookie'));

				return res.json(user);
			});
		})

        .delete((req, res) => {
            let config = app.locals.get('auth.cookie');

            res.clearCookie(config.name);
            res.cookie(config.name, '-', config);

            return res.send();
        })

        .get((req, res) => {
            /* Check if req contains user, return if yes, 401 if not */
            return (req.jwt.isValid) ?
                res.status(200).send(req.jwt.payload) : res.sendStatus(401);
        });

	return router;
};
