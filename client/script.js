const body = document.querySelector('body');
const toggleBtn = document.querySelector('nav .toggleBtn');

toggleBtn.addEventListener("click",()=>{
    body.classList.toggle("active")
})

