document.addEventListener('DOMContentLoaded', ()=>{
    let btn = document.querySelectorAll('.btn-delete')
    btn.forEach(b =>{
        b.addEventListener('click',deleteUser)
    })
})

function deleteUser(){
    let id = this.dataset.id
    if(id != null){
        fetch('/admin/fecthDelete',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({id:id})
        })
        .then(res => res.json())
        .then(result =>{
            if(result.ok){
                alert('Sucesso! Usuário deletado.')
                window.location.reload()
            }else{
                alert('Erro...Algo deu errado ao excluir o usuário')
                window.location.reload()
            }
        })
    }
}

