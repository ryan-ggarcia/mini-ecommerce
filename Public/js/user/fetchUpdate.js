document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btn-update').addEventListener('click', update)
})

function update() {
    const id = document.getElementById('id')
    const nome = document.getElementById('nome')
    const email = document.getElementById('email')
    const senha = document.getElementById('senha')
    const date = document.getElementById('data')
    const telefone = document.getElementById('tel')
    const cpf = document.getElementById('cpf')
    const perfil = document.getElementById('profile')
    const status = document.getElementById('status')

    const endId = document.getElementById('endId')
    const cep = document.getElementById('cep')
    const uf = document.getElementById('uf')
    const cidade = document.getElementById('cidade')
    const bairro = document.getElementById('bairro')
    const rua = document.getElementById('rua')
    const numero = document.getElementById('numero')
    const comple = document.getElementById('comple')

    nome.style.borderColor = "green"
    email.style.borderColor = 'green'
    senha.style.borderColor = 'green'
    date.style.borderColor = 'green'
    telefone.style.borderColor = 'green'
    cpf.style.borderColor = 'green'
    perfil.style.borderColor = 'green'

    cep.style.borderColor = 'green'
    uf.style.borderColor = 'green'
    cidade.style.borderColor = 'green'
    bairro.style.borderColor = 'green'
    rua.style.borderColor = 'green'
    numero.style.borderColor = 'green'

    let ok = true
    if (!nome.value && !email.value && !senha.value && !date.value && !telefone.value && !cpf.value && perfil.value == "0") {
        showToast("Preencha todos os campos obrigatórios!", 'error')
        nome.style.borderColor = 'red'
        email.style.borderColor = 'red'
        senha.style.borderColor = 'red'
        date.style.borderColor = 'red'
        telefone.style.borderColor = 'red'
        cpf.style.borderColor = 'red'
        perfil.style.borderColor = 'red'
        return ok = false
    }
    if (!nome.value || !date.value || !telefone.value || !cpf.value || perfil.value == "0") {
        showToast("Campos obrigatórios não preenchidos.", 'error')
        if (!nome.value) nome.style.borderColor = 'red'
        if (!date.value) date.style.borderColor = 'red'
        if (!telefone.value) telefone.style.borderColor = 'red'
        if (!cpf.value) cpf.style.borderColor = 'red'
        if (perfil.value == "0") perfil.style.borderColor = 'red'
        ok = false
    }
    if (!senha.value) {
        showToast("Informe a nova senha.", 'error')
        if (!senha.value) senha.style.borderColor = 'red'
        ok = false
    }
    if (!email.value || !email.value.includes('@') || !email.value.includes('.com')) {
        showToast("E-mail inválido. Verifique o formato.", 'error')
        email.style.borderColor = 'red'
        ok = false
    }

    if (!cep.value || !uf.value || !cidade.value || !bairro.value || !rua.value || !numero.value) {
        showToast("Preencha todos os dados do endereço para prosseguir.", 'error')
        if (!cep.value) cep.style.borderColor = 'red'
        if (!uf.value) uf.style.borderColor = 'red'
        if (!cidade.value) cidade.style.borderColor = 'red'
        if (!bairro.value) bairro.style.borderColor = 'red'
        if (!rua.value) rua.style.borderColor = 'red'
        if (!numero.value) numero.style.borderColor = 'red'
        ok = false
    }
    if (comple.value == "") comple.value = "Sem complemento"
    if (ok) {
        fetch('/admin/fecthUpdate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id.value,
                nome: nome.value,
                email: email.value,
                senha: senha.value,
                data: date.value,
                tel: telefone.value,
                cpf: cpf.value,
                status: status.value,
                endId: endId.value,
                cep: cep.value,
                uf: uf.value,
                cidade: cidade.value,
                bairro: bairro.value,
                rua: rua.value,
                numero: numero.value,
                perfil: perfil.value,
                complemento: comple.value
            })
        })
        .then(res => res.json())
        .then(result =>{
            if(result.ok){
                showToast('Alteração realizada com sucesso!', 'success')
                setTimeout(() => { window.location.href = '/admin/listar' }, 1100)
            }else{
                showToast('Não foi possível efetuar a alteração.', 'error')
            }
        })
    }
}