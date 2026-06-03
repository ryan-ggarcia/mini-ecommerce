function efetuarLogin() {
    let ok = true
    const email = document.getElementById('email')
    const senha = document.getElementById('senha')

    email.style.borderColor = 'gree'
    senha.style.borderColor = 'gree'

    if (!email.value && !senha.value) {
        alert('Preencha todos os campos para prosseguir!')
        email.style.borderColor = 'red'
        senha.style.borderColor = 'red'
        ok = false
    }
    if(!email.value.includes('@') || !email.value.includes('.com') ){
        if(!email.value.includes('@') && !email.value.includes('.com'))
            alert('Gredenciais do emails estão incorretos! Insira @ e .com')
        if(!email.value.includes('@'))
            alert('Insira o @ para conseguir logar!')
        if(!email.value.includes('.com'))
            alert('Coloque ".com" no final! ')

        email.style.borderColor = 'red'
        ok = false
    }
    if(!senha.value.lenght > 6){
        alert('Erro... A senha devera ter no mínimo 6 caracteres esses sendo letra minuscula e maiuscula e numeros')
        ok = false
    }
    if(!ok)
        return
    fetch('/login/efetuarLogin',{
        method:'POST',
        headers: { 'Content-type':'application/json' },
        body:JSON.stringify({
            email:email.value,
            senha:senha.value
        })
    }) 
    .then(r =>{ return r.json() })
    .then(result =>{
        if(result.ok){
            alert(result.msg)
            if(result.perfil == 1)
                window.location.href = '/admin'
            else
                window.location.href = '/'
        }else
            alert(result.msg)
    })
    
}