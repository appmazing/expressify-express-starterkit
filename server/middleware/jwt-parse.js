import jwt from 'jsonwebtoken';

export const path = '/';

export const callback = (app) => {

    app.use(path, (req, res, next) => {

        /* expose processed details to further middleware */
        req.jwt = {

            /* indicate if token is valid */
            isValid: false,

            /* raw, non-parsed token */
            token: '',

            /* error why token is invalid if is */
            /* @TODO: set default error "NOT_VALIDATED_YET" */
            error: { name: '', message: '' },

            /* payload stored by valid token */
            payload: null,
        };

        if (req.cookies && req.cookies.Authorization) {

            let token = req.cookies.Authorization;

            jwt.verify(token, app.locals.get('auth.jwt.secret'), (err, payload) => {
                if(err) {
                    req.jwt.error = err;
                } else {
                    req.jwt.isValid = true;
                    req.jwt.token = token;
                    req.jwt.payload = payload;
                }

                next();
            });
        } else {
            /**
             * @TODO: config perhaps?
             */
            req.jwt.error.message = 'Token missing';
            req.jwt.error.name = 'TokenMissingError';
            next();
        }
    });
};
