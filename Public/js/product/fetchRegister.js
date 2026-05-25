document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btn-register').addEventListener('click', register)
    // Evento de change para pegar a imagem do formulario
    document.getElementById('img').addEventListener('change', carregarPrevia)
})
function carregarPrevia() {
    console.log(this.files)
    if (this.files.length > 0) {
        let img = document.getElementById('imgPrev') // Pegando tag da previa da imagem
        let urlImg = URL.createObjectURL(this.files[0])
        img.src = urlImg
        document.getElementById('divPrevImg').style.display = 'block'
    }
}
function register() {
    const nome = document.getElementById('nome')
    const preco = document.getElementById('preco')
    const quant = document.getElementById('quant')
    const status = document.getElementById('status')
    const cat = document.getElementById('cat')
    const marca = document.getElementById('marca')
    const img = document.getElementById('img')
    const desc = document.getElementById('desc')

    nome.style.borderColor = "green"
    preco.style.borderColor = 'green'
    quant.style.borderColor = 'green'
    status.style.borderColor = 'green'
    cat.style.borderColor = 'green'
    marca.style.borderColor = 'green'
    desc.style.borderColor = 'green'

    if (!nome.value && !preco.value && !quant.value && cat.value == '0' && marca.value == '0' && !desc.value) {
        alert('Preencha todos os campos obrigatorios!')
        nome.style.borderColor = "red"
        preco.style.borderColor = 'red'
        quant.style.borderColor = 'red'
        cat.style.borderColor = 'red'
        marca.style.borderColor = 'red'
        desc.style.borderColor = 'red'
    }
    if (!nome.value || !preco.value || !quant.value || cat.value == '0' || marca.value == '0' || !desc.value) {
        alert('Preencha todos os campos obrigatorios!')
        if(!nome.value) nome.style.borderColor = "red"
        if(!preco.value)preco.style.borderColor = 'red'
        if(!quant.value) quant.style.borderColor = 'red'
        if(!cat.value)cat.style.borderColor = 'red'
        if(!marca.value)marca.style.borderColor = 'red'
        if(!desc.value)desc.style.borderColor = 'red'
    }
    if (nome.value && preco.value && quant.value && cat.value != '0' && marca.value != '0' && desc.value) {
        let formData = new FormData()
        formData.append('nome',nome.value)
        formData.append('preco',preco.value)
        formData.append('quantidade',quant.value)
        formData.append('categoria',cat.value)
        formData.append('marca',marca.value)
        formData.append('descricao',desc.value)
        formData.append('status',status.value)
        formData.append('image',img.files[0])
        fetch('/admin/registerNewProduto',{
            method: 'POST',
            body: formData
        })
        .then(r => r.json())
        .then(res =>{
            if(res.ok){
                alert(res.msg)
                window.location.href = '/admin/listarProduto'
            }else{
                alert(res.msg)
                window.location.reload()
            }
        })

    }

}