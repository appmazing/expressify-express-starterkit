import bodyParser from 'body-parser';

export const path = '/api';

export const callback = (app) => {
    /**
     * Enable parsing urlencoded request body
     */
    app.use(path, bodyParser.urlencoded(app.config.get('bodyParser.urlencoded')));
};
