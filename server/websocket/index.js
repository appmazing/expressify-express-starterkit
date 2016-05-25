import socketio from 'socket.io';
import requireDir from 'require-dir';

export default function (app) {

    if(typeof app.server === 'undefined') {
        throw new Error('No `app.server` instance provided.');
    }

    /* set socket handlers map to use same method for initializing all handlers */
    const files = requireDir('./handlers', { recurse: true });

    /* initialize websocket server based on express application instance */
    app.sockets = socketio(app.server);

    /* initialize socket messages handlers when new connection starts */
    app.sockets.on('connection', (socket) => {
        Object.keys(files).forEach((file) => {

            let { handlers } = files[file];

            handlers(socket);
        });
    });

    return app;
}
