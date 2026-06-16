
async function montarTabela(termo){
    const dados = await fetch(`/admin/buscarVendas/${termo}`)
    const {res} = await dados.json()
    const tbody = document.getElementById('table')
    let html = ``
    if(res.length > 0){
        res.forEach(r =>{
            html += `
                 <tr>
                        <td>
                           #${r.iProd_id}
                        </td>
                        <td>
                           ${r.usu_nome}
                        </td>
                        <td>
                           ${r.pro_nome}
                        </td>
                        <td>
                            ${r.ped_data.toLocaleDateString('pt-BR', { day: '2-digit' , month: '2-digit' ,
                                year: 'numeric' })}
                        </td>
                         <td>
                           ${r.iProd_quantidade}
                        </td>
                        <td>
                           ${r.iProd_valorUnitario}
                        </td>
                        <td>
                            ${r.iProd_valorTotal}
                        </td>
                    </tr>
            `
        })
        tbody.innerHTML = html
    }else{
       tbody.innerHTML = `<tr><td colspan="9" class="admin-empty">Nenhum produto encontrado.</td></tr>`

    }
}