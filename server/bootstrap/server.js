import http from 'http';

export default (app) => {
    return new Promise((resolve, reject) => {
        let port = app.config.get('port');
        let server = http.createServer(app).listen(port);

        app.server = server;

        app.log('info', '[ message ] Listening at port %s', port);

        resolve(app);
    });
}
