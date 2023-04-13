const socket = io('http://localhost:7000');

const form = document.getElementById('send-container');
const messageInp = document.getElementById('messageInp');
const msgContainer = document.querySelector('.main .container');
const userName = document.querySelector('.message .name')
const msgboxs = document.querySelectorAll('.message')
const user = document.getElementById('name')



//Create Random  color for user
function getRandomArbitrary(min, max) {
    const r = Math.floor(Math.random() * (max - min) + min);
    const g = Math.floor(Math.random() * (max - min) + min);
    const b= Math.floor(Math.random() * (max - min) + min);
    return `rgb(${r},${g},${b})`;
  }
const color= getRandomArbitrary(1,255)

//Create Current date
const current = ()=>{
    const today = new Date()
    const date = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}`
    return date
}

//Append the user join and user left message in container
const append = (message,classes)=>{
    const elementToApp = document.createElement('div');
    elementToApp.innerText= message;
    elementToApp.classList.add(classes)
    msgContainer.append(elementToApp)
    msgContainer.scrollTop = msgContainer.scrollHeight;
}

//Appendding the send and receive message
const append1 = (user,message,classes,col)=>{
    const elementToApp = document.createElement('div');
    elementToApp.innerText= message;
    elementToApp.classList.add(classes)
    elementToApp.classList.add('message')

    const htmlData = `<div class="name"style="color:${col}" >${user}<span>${current()}</span></div>`
    elementToApp.insertAdjacentHTML("afterbegin",htmlData);

    msgContainer.append(elementToApp)
    msgContainer.scrollTop = msgContainer.scrollHeight;
}

//Running socket event and append1()
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let message = messageInp.value;
    append1('You',message,'right',color)
    messageInp.value =""
    socket.emit('send',{message,color})
    socket.emit('getcolor',color)
    
})

//Asking username for user
const name = prompt("Enter Your Name to Join")
socket.emit('new-user-joined',name)

//Broadcasting event that new user has join
socket.on('user-joined',data=>{
append(`${data} joined at ${current()}`,'newUser')
})

//BroadCasting the message to all
socket.on('receive',data=>{
    append1( data.name,`${data.message}`,'left',data.color)
})

//BroadCasting that the user has left
socket.on('left', name =>{
    append(`${name} left at ${current()}`,'newUser')
})


