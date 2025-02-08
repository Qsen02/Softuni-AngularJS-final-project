const { Server } = require("socket.io");

function socketConnection(httpServer){
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection',(socket)=>{
        socket.on('chat message', (msg) => {
            io.emit('chat message', msg);
        });
        socket.on('delete message',(msg)=>{
            io.emit('message deleted',msg);
        });
        socket.on("update message",(msg)=>{
            io.emit("message updated",msg);
        })
    });
}

module.exports={
    socketConnection
}
