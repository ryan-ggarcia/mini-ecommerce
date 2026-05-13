document.addEventListener('DOMContentLoaded', ()=>{
    let btn = document.querySelectorAll('.btn-delete')
    btn.forEach(b =>{
        b.addEventListener('click',deleteUser)
    })
})

function deleteUser(){
    let id = this.dataset.id
    
}
