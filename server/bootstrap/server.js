import http from 'http';

export default (app) => {

    let port = app.locals.get('port');
    let server = http.createServer(app).listen(port);

    app.server = server;

    app.log('info', '[ message ] Listening at port %s', port);

    return Promise.resolve(app);
};
