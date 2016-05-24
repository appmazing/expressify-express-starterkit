import cacheResponseDirective from 'express-cache-response-directive';

export const path = '/';

export const callback = (app) => {
    app.use(path, cacheResponseDirective());

    /**
     * Url:
     * https://github.com/dantman/express-cache-response-directive
     *
     * Usage:
     * app.get('/', function(req, res, next) {
     *    res.cacheControl({maxAge: 300});
     *        // ...
     * });
     **/

};
