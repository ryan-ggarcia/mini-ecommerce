
const btn = document.querySelectorAll('.open-modal')
const openModal = document.querySelector('.modal')
const closeModal = document.querySelector('.close-modal')
//Abrir o modal
btn.forEach(b => {
    b.addEventListener('click', async function () {
        const endId = this.dataset.end // pega o end_id do usuario que está no button
        const res = await fetch(`/admin/getEndereco/${endId}`) // faz a requisição para o servidor
        let dados = await res.json() // converte o json em objeto
        // Injetando os dados trazidos da API no EJS
        const table = document.getElementById('end_table')
        if(dados != null){
             table.innerHTML = 
        `
            <tr>
                <td>
                    ${dados.end_id}
                </td>
                <td>
                    ${dados.end_cep}
                </td>
                <td>
                    ${dados.end_uf}
                </td>
                <td>
                    ${dados.end_cidade}
                </td>
                <td>
                    ${dados.end_bairro}
                </td>
                <td>
                    ${dados.end_rua}
                </td>
                <td>
                    ${dados.end_numero}
                </td>
                <td>
                    ${dados.end_complemento}
                </td>
            </tr>
        `
        }else
            table.innerHTML = `<tr><td>Endereço não localizado!</td></tr>`
        openModal.classList.toggle('active')
    })
})
// fechando modal pelo botão
closeModal.addEventListener('click', function () {
    openModal.classList.remove('active')
})
//fechando modal pelo fundo
openModal.addEventListener('click', function () {
    openModal.classList.remove('active')
})

