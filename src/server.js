import Server from 'socket.io';

export function startServer(store) {
    let connections = {};
    const io = new Server().attach(8090);

    store.subscribe(
        () => io.emit('state', store.getState().toJS())
    );

    io.on('connection', (socket) => {
        console.log('batty connection');
        socket.emit('state', store.getState().toJS());
        socket.on('action', store.dispatch.bind(store));
        socket.on('disconnect', () => {
            console.log( socket.id, 'disconnecting');
            delete connections[socket.id.substr(2)];
            store.dispatch({type: 'REMOVE_MEMBER', payload: socket.id.substr(2)});
        });
        let socketId = socket.id.substr(2);
        connections[socketId] = true;
        console.log(connections);
    });

}