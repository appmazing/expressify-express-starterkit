/**
 * Websocket events and messages
 */
import websocket from '../websocket';

export default (app) => {
    return Promise.resolve(websocket(app));
}
