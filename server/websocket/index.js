/* core dependencies */
import socketio from 'socket.io';

/* require whole directory */
import requireDir from 'require-dir';

/* set socket handlers map to use same method for initializing all handlers */
const files = requireDir('./handlers', { recurse: true });

export default function (server) {
    /* initialize websocket server based on express application instance */
    const socketServer = socketio(server);

    /* initialize socket messages handlers when new connection starts */
    socketServer.on('connection', (socket) => {
        Object.keys(files).forEach((file) => {
            var { handlers } = files[file];

            handlers(socket);
        });
    });
    
    return socketServer;
}
