function montarCarrinho() {
    let divConteiner = document.getElementById('produtos-carrinho');
    let divConta = document.getElementById('conta');
    let valorTotal = 0;

    divConteiner.innerHTML = '';
    divConta.innerHTML = '';

    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    if (carrinho.length > 0) {
        carrinho.forEach(c => {
            let itemTotal = parseFloat(c.preco) * parseInt(c.quantidade);
            valorTotal += itemTotal;

            let html = `
                <div class="cart-item">
                    <div class="cart-item__media">
                        <img src="/image/produtos/${c.imagem}" alt="${c.nome}">
                    </div>
                    <div class="cart-item__info">
                        <h3>${c.nome}</h3>
                        <p class="cart-item__qty">Qtd: ${c.quantidade}</p>
                    </div>
                    <div class="cart-item__side">
                        <div class="cart-item__price">R$ ${itemTotal.toFixed(2).replace('.', ',')}</div>
                        <div class="cart-item__actions">
                            <a href="/home/produto/${c.id}">Ver</a>
                            <button onclick="removerDoCarrinho(${c.id})">Remover</button>
                        </div>
                    </div>
                </div>
            `;
            divConteiner.innerHTML += html;
        });

        let subtotalHtml = `
            <div class="summary-row">
                <span>Subtotal (${carrinho.length} ${carrinho.length === 1 ? 'item' : 'itens'})</span>
                <span>R$ ${valorTotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div class="summary-total">
                <span>Total</span>
                <span>R$ ${valorTotal.toFixed(2).replace('.', ',')}</span>
            </div>
        `;
        divConta.innerHTML = subtotalHtml;

        document.querySelector('.clear').innerHTML = `
            <button class="cart-clear" onclick="limparCarrinho()">
                <i class="fa-solid fa-trash-can"></i> Limpar carrinho
            </button>
        `;

        let formaPagamentoEl = document.querySelector('.formaPagamento');
        if (formaPagamentoEl) {
            formaPagamentoEl.innerHTML = `
                <label class="cart-label" for="pagamento">Forma de pagamento</label>
                <select id="pagamento" name="pagamento" class="cart-select">
                    <option value="pix">Pix</option>
                    <option value="entrega">Na entrega</option>
                </select>
            `;

            const existingBtn = document.querySelector('.btn-checkout');
            if (existingBtn) {
                existingBtn.style.display = '';
                existingBtn.onclick = comprar;
            }
        }

    } else {
        divConteiner.innerHTML = `
            <div class="cart-empty">
                <i class="fa-solid fa-bag-shopping"></i>
                <h2>Seu carrinho está vazio</h2>
                <p>Explore a loja e adicione produtos para montar seu pedido.</p>
                <a href="/home/shop" class="btn-primary">Explorar produtos</a>
            </div>
        `;
        divConta.innerHTML = `
            <div class="cart-account-empty">
                <p>Nenhum item selecionado.</p>
                <div class="summary-total">
                    <span>Total</span>
                    <span>R$ 0,00</span>
                </div>
            </div>
        `;
        document.querySelector('.clear').innerHTML = '';
        let formaPagamentoEl = document.querySelector('.formaPagamento');
        if (formaPagamentoEl) formaPagamentoEl.innerHTML = '';
        const existingBtn = document.querySelector('.btn-checkout');
        if (existingBtn) existingBtn.style.display = 'none';
    }
}

function removerDoCarrinho(id) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho = carrinho.filter(c => c.id != id);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    montarCarrinho();
}

function limparCarrinho() {
    localStorage.removeItem('carrinho');
    montarCarrinho();
}

function comprar() {
    let json = [];
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    if (carrinho.length > 0) {
        let valorTotal = 0;
        carrinho.forEach(c => valorTotal += parseFloat(c.preco) * parseInt(c.quantidade));

        carrinho.forEach(c => {
            json.push({
                idProduto: c.id,
                nomeProduto: c.nome,
                quantidade: c.quantidade,
                valorUnitario: c.preco,
                valorTotal: valorTotal
            });
        });

        fetch('/pedido/registerPedido', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ json })
        })
        .then(r => r.json())
        .then(r => {
            if (r.ok) {
                showToast("Pedido realizado com sucesso!", 'success');
                limparCarrinho();
                setTimeout(() => { window.location.href = "/home"; }, 1200);
            } else {
                showToast(r.msg || "Erro ao finalizar pedido.", 'error');
            }
        })
        .catch(e => {
            console.error(e);
            showToast("Erro de conexão ao finalizar o pedido.", 'error');
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    montarCarrinho();
});
