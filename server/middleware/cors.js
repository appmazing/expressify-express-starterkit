import cors from 'cors';

export const path = '/api';

export const callback = (app) => {

    /* @TODO: MOVE THIS UGLY HACK TO app.getRaw is it needs mutable object here */
    app.use(path, cors(JSON.parse(JSON.stringify(app.locals.get('cors')))));
};
