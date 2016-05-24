import bodyParser from 'body-parser';

export const path = '/api';

export const callback = (app) => {
    /**
     * Enable parsing JSON payload
     */
    app.use(path, bodyParser.json(app.config.get('bodyParser.json')));
};
