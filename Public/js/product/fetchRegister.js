document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btn-register').addEventListener('click', register)
})
function register() {
    const nome = document.getElementById('nome')
    const preco = document.getElementById('preco')
    const quant = document.getElementById('quant')
    const validade = document.getElementById('validade')
    const status = document.getElementById('status')
    const cat = document.getElementById('cat')
    const marca = document.getElementById('marca')
    // imagem
    const desc = document.getElementById('desc')

    nome.style.borderColor = "green"
    preco.style.borderColor = 'green'
    quant.style.borderColor = 'green'
    validade.style.borderColor = 'green'
    status.style.borderColor = 'green'
    cat.style.borderColor = 'green'
    marca.style.borderColor = 'green'
    desc.style.borderColor = 'green'

}