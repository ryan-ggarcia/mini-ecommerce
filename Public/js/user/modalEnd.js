
const btn = document.querySelectorAll('.open-modal')
const openModal = document.querySelector('.modal')
const closeModal = document.querySelector('.close-modal')
//Abrir o modal
btn.forEach(b =>{
    b.addEventListener('click', function(){
        openModal.classList.toggle('active')
    })
})
// fechando modal pelo botão
closeModal.addEventListener('click',function(){
    openModal.classList.remove('active')
})
//fechando modal pelo fundo
openModal.addEventListener('click', function(){
    openModal.classList.remove('active')
})

