document.addEventListener('DOMContentLoaded',function(){
    let btn = document.querySelectorAll('.btn-delete')
    btn.forEach(b =>{ b.addEventListener('click',excluir) })
})

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