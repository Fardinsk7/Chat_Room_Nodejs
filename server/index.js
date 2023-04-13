


//This Sever will listen to the incoming events
const  io = require('socket.io')(7000,{
    cors:{
        origin:['http://127.0.0.1:5500']
    }
})

const users ={};

io.on('connection',(socket)=>{
    //when new user joined it will broadcast to all
    socket.on('new-user-joined',name =>{
        console.log(name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    //when message is send in room will braodcast to all
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message.message,name:users[socket.id],color:message.color});
    });

    //When user is outoff chatoff it will broadcast to everyone that he has left
    socket.on('disconnect',message =>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id]
    })

})

