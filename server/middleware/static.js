import express from 'express';

export const path = '/static';

export const callback = (app) => {
    /**
     * Enable static files handling
     */
    app.use(path, express.static(app.config.get('staticDir')));
}
