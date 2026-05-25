document.addEventListener('DOMContentLoaded', function () {
    let btn = document.querySelectorAll('.btn-delete')
    btn.forEach(b => { b.addEventListener('click', excluir) })
    let img = document.querySelectorAll('.btn-preview')
    img.forEach(i => { i.addEventListener('click', viewImg) })
})

function viewImg() {
    let img = this.dataset.image
    let tagImg = document.getElementById('img-modal')
    let modal = document.getElementById('modal')
    let divModal = document.getElementById('div-modal')
    let close = document.getElementById('btn-close')
    modal.classList.toggle('active')
    tagImg.src = img
    modal.addEventListener('click', ()=>{ modal.classList.remove('active') })
    close.addEventListener('click', ()=>{ modal.classList.remove('active') })
}

function excluir() {
    const id = Number(this.dataset.id)
    if (id != null && id > 0) {
        if (confirm('Você realmente deseja excluir esse produto?')) {
            fetch('/admin/deletarProduto', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id })
            })
                .then(r => r.json())
                .then(result => {
                    if (result.ok) {
                        alert('Sucesso!! Produto excluído!')
                        window.location.reload()
                    } else {
                        alert('Ops... Algo deu errado! ' + (result.msg || ''))
                    }
                })
                .catch(err => {
                    console.error('Erro na requisição:', err)
                    alert('Erro de comunicação com o servidor.')
                })
        }
    }
}