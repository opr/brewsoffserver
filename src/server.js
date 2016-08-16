import Server from 'socket.io';

export function startServer(store) {
    let connections = {};
    const io = new Server().attach(8090);

    let lastState = store.getState();
    console.log(lastState);

    store.subscribe(
        () => {
            for(let p of store.getState().get('parties')) {
                let partyName = p[0];
                if(lastState.getIn( ['parties', partyName ] ) != store.getState().getIn( ['parties', partyName ] ) ) {

                    if(store.getState().getIn( [ 'parties', partyName, 'brewInProgress' ] ) && ! lastState.getIn( [ 'parties', partyName, 'brewInProgress' ] ) ) {
                        io.to(p[0]).emit('brewStarting', {name: store.getState().getIn([ 'parties', partyName, 'members', store.getState().getIn(['parties', partyName, 'brewer']), 'name']), brewer: store.getState().getIn(['parties', partyName, 'brewer'])});
                    }
                    io.to(p[0]).emit('state', store.getState().getIn(['parties', partyName]).toJS());
                }
            }
            lastState = store.getState();
        }
    );

    io.on('connection', (socket) => {
        socket.emit('state', store.getState().toJS());
        socket.on('joinRoom', msg => {
            socket.join(msg);
        });
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