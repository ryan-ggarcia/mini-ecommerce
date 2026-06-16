document.addEventListener('DOMContentLoaded', function () {
    carregarImagem()
    document.getElementById('img').addEventListener('change', carregarPrevia)
    document.getElementById('btn-update').addEventListener('click', update)
})

function carregarImagem() {
    let img = document.getElementById('imgPrev').dataset.img
    if (img != '') {
        document.getElementById('divPrevImg').style.display = 'block'
        document.getElementById('imgPrev').src = `/image/produtos/${img}`
    }
}
function carregarPrevia() {
    if (this.files.length > 0) {
        let urlImg = URL.createObjectURL(this.files[0])
        document.getElementById('imgPrev').src = urlImg
        document.getElementById('divPrevImg').style.display = 'block'
    }
}

function update() {
    const nome = document.getElementById('nome')
    const preco = document.getElementById('preco')
    const desconto = document.getElementById('desconto')
    const quant = document.getElementById('quant')
    const status = document.getElementById('status')
    const cat = document.getElementById('cat')
    const marca = document.getElementById('marca')
    const img = document.getElementById('img')
    const desc = document.getElementById('desc')
    const id = document.getElementById('id')

    nome.style.borderColor = "green"
    preco.style.borderColor = 'green'
    quant.style.borderColor = 'green'
    status.style.borderColor = 'green'
    cat.style.borderColor = 'green'
    marca.style.borderColor = 'green'
    desc.style.borderColor = 'green'

    if (!nome.value && !preco.value && !quant.value && cat.value == '0' && marca.value == '0' && !desc.value) {
        showToast('Preencha todos os campos obrigatórios!', 'error')
        nome.style.borderColor = "red"
        preco.style.borderColor = 'red'
        quant.style.borderColor = 'red'
        cat.style.borderColor = 'red'
        marca.style.borderColor = 'red'
        desc.style.borderColor = 'red'
    }
    if (!nome.value || !preco.value || !quant.value || cat.value == '0' || marca.value == '0' || !desc.value) {
        showToast('Preencha todos os campos obrigatórios!', 'error')
        if (!nome.value) nome.style.borderColor = "red"
        if (!preco.value) preco.style.borderColor = 'red'
        if (!quant.value) quant.style.borderColor = 'red'
        if (!cat.value) cat.style.borderColor = 'red'
        if (!marca.value) marca.style.borderColor = 'red'
        if (!desc.value) desc.style.borderColor = 'red'
    }
    if (nome.value && preco.value && quant.value && cat.value != '0' && marca.value != '0' && desc.value) {
        let formData = new FormData()
        formData.append('id', id.value)
        formData.append('nome', nome.value)
        formData.append('preco', preco.value)
        formData.append('desconto', desconto.value || 0)
        formData.append('quantidade', quant.value)
        formData.append('categoria', cat.value)
        formData.append('marca', marca.value)
        formData.append('descricao', desc.value)
        formData.append('status', status.value)
        if(img.files[0]) 
            formData.append('image', img.files[0]) 
        fetch('/admin/update', {
            method: 'POST',
            body: formData
        })
            .then(r => r.json())
            .then(res => {
                if (res.ok) {
                    showToast('Produto atualizado com sucesso!', 'success')
                    setTimeout(() => { window.location.href = '/admin/listarProduto' }, 1100)
                } else {
                    showToast(res.msg || 'Não foi possível atualizar o produto.', 'error')
                }
            })

    }

}