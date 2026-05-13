
document.addEventListener('DOMContentLoaded',()=>{
    
    document.getElementById('btn-register').addEventListener('click', newRegister)
})

function newRegister(){
    const nome = document.getElementById('nome')
    const email = document.getElementById('email')
    const senha = document.getElementById('senha')
    const csenha = document.getElementById('csenha')
    const date = document.getElementById('data')
    const telefone = document.getElementById('tel')
    const cpf = document.getElementById('cpf')

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
    csenha.style.borderColor = 'green'
    date.style.borderColor = 'green'
    telefone.style.borderColor = 'green'
    cpf.style.borderColor = 'green'
    
    cep.style.borderColor = 'green'
    uf.style.borderColor = 'green'
    cidade.style.borderColor = 'green'
    bairro.style.borderColor = 'green'
    rua.style.borderColor = 'green'
    numero.style.borderColor = 'green'

    let ok = true
    if(!nome.value && !email.value && !senha.value && !csenha.value && !date.value && !telefone.value && !cpf.value){
        alert("Preencha todos os campos obrigatorios!")
        nome.style.borderColor = 'red'
        email.style.borderColor = 'red'
        senha.style.borderColor = 'red'
        csenha.style.borderColor = 'red'
        date.style.borderColor = 'red'
        telefone.style.borderColor = 'red'
        cpf.style.borderColor = 'red'
        return ok = false
    }
    if(!nome.value || !date.value || !telefone.value || !cpf.value){
        alert("Campos obrigatorios não empreenchido")
        if(!nome.value) nome.style.borderColor = 'red'
        if(!date.value) date.style.borderColor = 'red'
        if(!telefone.value) telefone.style.borderColor = 'red'
        if(!cpf.value) cpf.style.borderColor = 'red'
        ok = false
    }
    if(!senha.value || !csenha.value || senha.value.length > 6 || senha.value != csenha.value){
        alert("Senha e Confirmar senha incorretos")
        if(!senha.value) senha.style.borderColor = 'red'
        if(!csenha.value) csenha.style.borderColor = 'red'
        ok = false
    }
    if(!email.value || !email.value.includes('@') || !email.value.includes('.com')){
        alert("Dados do email incorretos!")
        email.style.borderColor = 'red'
        ok = false
    }

    if(!cep.value || !uf.value || !cidade.value || !bairro.value || !rua.value || !numero.value){
        alert("Preencha todos os dados do endereço para proseguir!")
        if(!cep.value) cep.style.borderColor ='red'
        if(!uf.value) uf.style.borderColor ='red'
        if(!cidade.value) cidade.style.borderColor ='red'
        if(!bairro.value) bairro.style.borderColor ='red'
        if(!rua.value) rua.style.borderColor ='red'
        if(!numero.value) numero.style.borderColor ='red'
        ok = false
    }
    if(comple.value == "") comple.value = "Sem complemento"

    if(!ok){
        fetch('/admin/newRegister',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                nome: nome.value,
                email: email.value,
                senha: senha.value,
                data: date.value,
                tel: telefone.value,
                cpf: cpf.value,
                cep: cep.value,
                uf:uf.value,
                cidade: cidade.value,
                bairro: bairro.value,
                rua: rua.value,
                numero: numero.value,
                complemento: comple.value
            })
        })
        .then(res => json())
        .then(result =>{
            if(result.ok){
                alert("Sucesso ao cadastrar usuário!")
                window.localStorage.href = '/admin/listar'
            }else{
                alert("Não foi possível cadastrar o cliente")
                window.location.reload()
            }
        })
    }


}