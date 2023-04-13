const socket = io('http://localhost:7000');

const form = document.getElementById('send-container');
const messageInp = document.getElementById('messageInp');
const msgContainer = document.querySelector('.main .container');
const userName = document.querySelector('.message .name')
const msgboxs = document.querySelectorAll('.message')
const user = document.getElementById('name')




function getRandomArbitrary(min, max) {
    const r = Math.floor(Math.random() * (max - min) + min);
    const g = Math.floor(Math.random() * (max - min) + min);
    const b= Math.floor(Math.random() * (max - min) + min);
    return `rgb(${r},${g},${b})`;
  }
const color= getRandomArbitrary(1,255)
//   user.addEventListener('click',()=>{
//     user.style.color = getRandomArbitrary()
// })


  const current = ()=>{
    const today = new Date()
    const date = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}`
    return date
}
// userName.addEventListener('click',()=>{
    
//     userName.style.color= getRandomArbitrary(1,255)
//     const date = current()
//     console.log(date)
// })

localStorage.setItem("color",getRandomArbitrary(1,255))



const append = (message,classes)=>{
    const elementToApp = document.createElement('div');
    elementToApp.innerText= message;
    elementToApp.classList.add(classes)
    msgContainer.append(elementToApp)
    msgContainer.scrollTop = msgContainer.scrollHeight;
    console.log("hello")
}

const append1 = (user,message,classes)=>{
    // userName.style.color= getRandomArbitrary(1,255)

    const elementToApp = document.createElement('div');
    elementToApp.innerText= message;
    elementToApp.classList.add(classes)
    elementToApp.classList.add('message')

    const htmlData = `<div class="name"style="color:${color}" >${user}<span>${current()}</span></div>`

    elementToApp.insertAdjacentHTML("afterbegin",htmlData);

    msgContainer.append(elementToApp)
    msgContainer.scrollTop = msgContainer.scrollHeight;
    console.log("hello")
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let message = messageInp.value;
    append1('You',message,'right')
    messageInp.value =""
    socket.emit('send',message)
    socket.emit('getcolor',color)
    console.log(color)
})

const name = prompt("Enter Your Name to Join")
socket.emit('new-user-joined',name)

socket.on('user-joined',data=>{
append(`${data} joined at ${current()}`,'newUser')
})

socket.on('receive',data=>{
    console.log(data)
    append1( data.name,`${data.message}`,'left')
})

//here we get name from server
socket.on('left', name =>{
    append(`${name} left at ${current()}`,'newUser')
})


