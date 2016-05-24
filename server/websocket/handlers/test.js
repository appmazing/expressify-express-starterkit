/* export handlers collection with socket instance injected */
export const handlers = (socket) => {
    socket.on('test', () => {
        console.log('Test socket message arrived');
    });
};
