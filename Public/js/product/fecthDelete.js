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
    modal.addEventListener('click', () => { modal.classList.remove('active') })
    close.addEventListener('click', () => { modal.classList.remove('active') })
}
async function filtrarProdutos(termo) {
    termo = termo.trim()

    // Caixa vazia: volta a lista completa
    if (termo === '') {
        window.location.reload()
        return
    }

    const dado = await fetch(`/admin/listarProduto/${termo}`)
    const { busca } = await dado.json()        // o controller manda { busca }

    const tbody = document.querySelector('.admin-table tbody')

    if (busca.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="admin-empty">Nenhum produto encontrado.</td></tr>'
        return
    }

    let html = ''
    busca.forEach(r => {                        // r = um produto da lista
        const stClass = r.pro_status === 'EM ESTOQUE' ? 'badge--ok'
            : (r.pro_status === 'SEM ESTOQUE' ? 'badge--out' : 'badge--warn')

        const preco = r.em_promocao
            ? `<span class="was">R$ ${parseFloat(r.pro_preco).toFixed(2)}</span><br>
               <span class="now">R$ ${Number(r.preco_final).toFixed(2)}</span>
               <span class="cell-discount">-${parseFloat(r.pro_desconto)}%</span>`
            : `<span class="now">R$ ${parseFloat(r.pro_preco).toFixed(2)}</span>`

        html += `
        <tr>
            <td class="num">${r.pro_id}</td>
            <td>
                <button class="btn-preview admin-thumb-btn" data-image="/image/produtos/${r.pro_image}" title="Ver imagem">
                    <img class="admin-thumb" src="/image/produtos/${r.pro_image}" alt="">
                </button>
            </td>
            <td style="font-weight: 500;">${r.pro_nome}</td>
            <td class="cell-price">${preco}</td>
            <td class="num">${r.pro_quantidade}</td>
            <td>${r.cat_nome || r.cat_id}</td>
            <td>${r.marca_nome || r.marca_id}</td>
            <td><span class="badge ${stClass}">${r.pro_status}</span></td>
            <td>
                <div class="table-actions">
                    <a href="/admin/updateView/${r.pro_id}" class="btn-action btn-edit" title="Editar"><i class="fa-solid fa-pen"></i></a>
                    <button class="btn-action btn-delete" data-id="${r.pro_id}" title="Excluir"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        </tr>`
    })

    tbody.innerHTML = html                      // escreve de verdade na tabela

    // Os botões foram recriados → religa os cliques de excluir/ver imagem
    document.querySelectorAll('.btn-delete').forEach(b => b.addEventListener('click', excluir))
    document.querySelectorAll('.btn-preview').forEach(i => i.addEventListener('click', viewImg))
}

// Filtro "Em promoção": esconde/mostra as linhas que já estão na tela.
// Um produto está em promoção quando a linha tem o selo .cell-discount.
function filtrarPromocao(valor) {
    document.querySelectorAll('.admin-table tbody tr').forEach(tr => {
        const temPromo = tr.querySelector('.cell-discount') !== null
        tr.style.display = (valor === 'promo' && !temPromo) ? 'none' : ''
    })
}
async function excluir() {
    const id = Number(this.dataset.id)
    if (!(id != null && id > 0)) return

    const confirmado = await confirmDialog('Esta ação remove o produto permanentemente e não pode ser desfeita.', {
        title: 'Excluir produto?',
        confirmText: 'Excluir',
        danger: true
    })
    if (!confirmado) return

    fetch('/admin/deletarProduto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id })
    })
        .then(r => r.json())
        .then(result => {
            if (result.ok) {
                showToast('Produto excluído com sucesso!', 'success')
                setTimeout(() => window.location.reload(), 1000)
            } else {
                showToast('Algo deu errado ao excluir. ' + (result.msg || ''), 'error')
            }
        })
        .catch(err => {
            console.error('Erro na requisição:', err)
            showToast('Erro de comunicação com o servidor.', 'error')
        })
}