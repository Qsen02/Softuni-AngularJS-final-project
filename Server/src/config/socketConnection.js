const { Server } = require("socket.io");

function socketConnection(httpServer){
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection',(socket)=>{
        socket.on('chat message', (chatId,msg) => {
            io.emit('chat message', chatId,msg);
        });
        socket.on('delete message',(msg)=>{
            io.emit('message deleted',msg);
        });
        socket.on("update message",(msg)=>{
            io.emit("message updated",msg);
        })
        socket.on("send request",(request)=>{
            io.emit("request sended",request);
        })
        socket.on("unreaded chats",(userId,chat)=>{
            io.emit("show chats",userId,chat);
        })
        socket.on("unreaded messages",(chatId,userId)=>{
            io.emit("show messages",chatId,userId);
        })
        socket.on("accept request",(chat,userId)=>{
            io.emit("add chat",chat,userId);
        })
        socket.on("read chats",(chat)=>{
            io.emit("chats readed",chat);
        })
        socket.on("read messages",(chatId)=>{
            io.emit("messages readed",chatId);
        })
    });
}

module.exports={
    socketConnection
}
