


//This Sever will listen to the incoming events
const  io = require('socket.io')(7000,{
    cors:{
        origin:['http://127.0.0.1:5500']
    }
})

function getRandomArbitrary(min, max) {
    const r = Math.floor(Math.random() * (max - min) + min);
    const g = Math.floor(Math.random() * (max - min) + min);
    const b= Math.floor(Math.random() * (max - min) + min);
    return `rgb(${r},${g},${b})`;
  }
let color="kjklj";

const users ={};


io.on('connection',(socket)=>{
    //What happen to a particular connection will be handled by socket.on
    socket.on('new-user-joined',name =>{
        console.log(name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('getcolor',color=>{
        console.log(color)
        color=color;
    })
    
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message,name:users[socket.id],color:color});
    });

    socket.on('disconnect',message =>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id]
    })

})

