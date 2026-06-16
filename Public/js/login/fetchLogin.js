function efetuarLogin() {
    let ok = true
    const email = document.getElementById('email')
    const senha = document.getElementById('senha')

    email.style.borderColor = ''
    senha.style.borderColor = ''

    if (!email.value && !senha.value) {
        showToast('Preencha todos os campos para prosseguir!', 'error')
        email.style.borderColor = 'red'
        senha.style.borderColor = 'red'
        ok = false
    }
    if(!email.value.includes('@') || !email.value.includes('.com') ){
        if(!email.value.includes('@') && !email.value.includes('.com'))
            showToast('Credenciais de e-mail incorretas. Inclua @ e .com', 'error')
        if(!email.value.includes('@'))
            showToast('Inclua o @ para conseguir entrar.', 'error')
        if(!email.value.includes('.com'))
            showToast('Inclua ".com" no final do e-mail.', 'error')

        email.style.borderColor = 'red'
        ok = false
    }
    if(!senha.value.lenght > 6){
        showToast('A senha deve ter no mínimo 6 caracteres, com letras maiúsculas, minúsculas e números.', 'error')
        ok = false
    }
    if(!ok)
        return
    fetch('/efetuarLogin',{
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
            showToast(result.msg || 'Login efetuado com sucesso!', 'success')
            setTimeout(() => {
                window.location.href = (result.perfil == 1) ? '/admin' : '/'
            }, 1100)
        }else
            showToast(result.msg || 'Não foi possível entrar.', 'error')
    })

}
