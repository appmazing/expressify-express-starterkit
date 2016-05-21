import cookieParser from 'cookie-parser';

export const path = '/api';

export const callback = (app) => {

    /**
     * Enable simple cookie parsing
     */
    app.use(path, cookieParser());
}
