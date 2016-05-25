/**
 * Websocket events and messages
 */
import websocket from '../websocket';

export default (app) => {
    return new Promise((resolve, reject) => {

        if(typeof app.server !== 'undefined') {
            
            /* Initialize websocket server */
            websocket(app.server);

            resolve(app);
        } else {
            reject('No `app.server` instance provided.');
        }

    });
}
