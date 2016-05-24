/* all `/api/<version>/<route>` except `/api/<version>/login` */
export const path = /\/api\/v(.+)\/(?!login).*/;

export const callback = (app) => {
    app.use(path, (req, res, next) => {

        let isOptions = (req.method === 'OPTIONS');

        if (!isOptions && !req.jwt.isValid) {
          return res.sendStatus(401);
        }

        next();
    });
};
