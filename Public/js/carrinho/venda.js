function montarCarrinho() {
    //pega o objeto de divConteiner
    let divConteiner = document.getElementById('produtos-carrinho')
    let divConta = document.getElementById('conta')
    let valorTotal = 0
    //Carrinho começa vazio
    divConteiner.innerHTML = ''
    divConta.innerHTML = ''
    //pegando itens do localStorage 'carrinho'
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || []
    if (carrinho.length > 0) {
        //Montando Carrinho de produtos
        carrinho.forEach(c => {
            let html = `
                <div class='card-conteiner'>
                    <div>
                        <img src='/image/produtos/${c.imagem}' width='200'>
                    </div>
                    <div>
                        <span class='name'> ${c.nome} </span>
                        <span class='preco'> ${c.preco} </span>
                        <span class='quantidade'> ${c.quantidade} </span>
                    </div>
                    <div>
                        <a href='/produto/${c.id}'> Visualizar </a>
                        <button class='remove' onclick='removerDoCarrinho(${c.id})'>Remover</button>
                    </div>
                </div>
            `
            //Montado div de forma de pagamento
            divConteiner.innerHTML += html
            let htmlx = `
                <div>
                    <span>${c.nome}... ${c.preco} x${c.quantidade}</span>
                    <span>Valor total:${valorTotal+=c.preco * c.quantidade} </span>
                </div>
            `
            divConta.innerHTML +=htmlx
        })
        //Colocando a exibição do botão de limpar carrinho
        document.querySelector('.clear').innerHTML = ` <button onclick="limparCarrinho()">Limpar carrinho</button>`
        document.querySelector('.formaPagamento').innerHTML = `
            <label for="pagamento">Selecione a forma de pagamento:</label>
            <select id="pagamento" name="pagamento">
                <option value="cartao">Cartão de Crédito</option>
                <option value="boleto">Boleto Bancário</option>
                <option value="pix">PIX</option>
            </select>
            <a href="#">Continuar comprando</a>
            <button id="finalizar-compra" onclick="comprar()" >Finalizar Compra</button>
        `
    }else{
        let html = `
            <div class='card-conteiner'>
                <h1>Carrinho vazio!</h1>
                <a href='#'>Escolher produtos</a>
            </div>
        `
        divConteiner.innerHTML +=html
        let htmlx = `
            <div>
                <h2>Selecione um produto para realizar o págamento!</h2>
                <span>Valor total: 0.00 </span>
            </div>
        `
        divConta.innerHTML = htmlx
    }
}
//Função para remover um produto expecifico
function removerDoCarrinho(id){
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []
    //filtra apenas o produto que o id é diferente do parametro passado
    carrinho = carrinho.filter(c => c.id != id)
    //Grava o filtro no localstorage
    localStorage.setItem('carrinho',JSON.stringify(carrinho))
    //Redesenha o carrinho na tela sem precisar recarregar a página
    montarCarrinho()
}
//Limpar localstorage do carrinho por completo
function limparCarrinho(){
    localStorage.removeItem('carrinho')
    //Redesenha o carrinho (vai cair no estado "vazio")
    montarCarrinho()
}
function comprar(){
    let json = []
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []
    if(carrinho.length > 0){
        let valorTotal = 0
        carrinho.forEach(c => valorTotal+=c.preco * c.quantidade)
        carrinho.forEach(c =>{
            json.push({
                idProduto: c.id,
                nomeProduto: c.nome,
                quantidade: c.quantidade,
                valorUnitario: c.preco,
                valorTotal: valorTotal
            })
        })
        //terminar fetch de pedido
        fetch('/pedido/registerPedido',{
            method: 'POST',
            headers: { 'Content-type':'application/json' },
            body:JSON.stringify({json})
        })
        .then(r => { return r.json() })
        .then(r => {
            if(r.ok){
                alert(r.msg)
                limparCarrinho()
            }else{
                alert(r.msg)
            }
        })
    } 
}
// função para montar o carrinho 
document.addEventListener('DOMContentLoaded',function(){
    montarCarrinho()
})