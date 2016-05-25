/**
 * Attach handlers to provided `socket` instance
 * @param  {Object} socket Socket.io WebSockets instance
 * @return {Void}
 */
export const handlers = (socket) => {
    socket.on('test', () => {
        console.log('Test socket message arrived');
    });
};
