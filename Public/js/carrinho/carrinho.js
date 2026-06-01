document.addEventListener('DOMContentLoaded',function(){
    document.getElementById('adicionar-carrinho').addEventListener('click',AdicionarCarrinho)
})

function AdicionarCarrinho(){
    //pegando os dados do data set 
    const produto = {
        id: this.dataset.id,
        nome: this.dataset.nome,
        preco: parseFloat(this.dataset.preco),
        imagem: this.dataset.imagem,
        quantidade: 1
    }
    // Pega o carrihno atual ou cria um array vazio
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []
    // Verifica se o produto já esta no carrinho
    const existe = carrinho.find(item => item.id === produto.id)

    if(existe) existe.quantidade += 1
    else carrinho.push(produto) 

    localStorage.setItem("carrinho", JSON.stringify(carrinho))
    alert("Produto adicionado no carrinho!")
}