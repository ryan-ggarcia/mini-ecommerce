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
                <div style="display: flex; gap: 1.5rem; padding: 1.5rem 0; border-bottom: 1px solid var(--border); align-items: center;">
                    <div style="width: 100px; height: 100px; border-radius: 8px; overflow: hidden; flex-shrink: 0; background: var(--bg-off);">
                        <img src='/image/produtos/${c.imagem}' style="width: 100%; height: 100%; object-fit: cover;" alt="${c.nome}">
                    </div>
                    <div style="flex-grow: 1;">
                        <h3 style="font-size: 1.1rem; margin-bottom: 0.25rem;">${c.nome}</h3>
                        <p style="color: var(--text-muted); font-size: 0.9rem;">Qtd: ${c.quantidade}</p>
                    </div>
                    <div style="text-align: right; min-width: 120px;">
                        <div style="font-weight: 600; font-size: 1.1rem; color: var(--primary); margin-bottom: 0.5rem;">
                            R$ ${itemTotal.toFixed(2).replace('.', ',')}
                        </div>
                        <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
                            <a href='/produto/${c.id}' style="font-size: 0.85rem; color: var(--text-muted); text-decoration: underline;">Ver</a>
                            <button onclick='removerDoCarrinho(${c.id})' style="font-size: 0.85rem; color: #ef4444; text-decoration: underline; background: none; border: none; cursor: pointer;">Remover</button>
                        </div>
                    </div>
                </div>
            `;
            divConteiner.innerHTML += html;
        });
        
        let subtotalHtml = `
            <div class="summary-row">
                <span>Subtotal (${carrinho.length} itens)</span>
                <span>R$ ${valorTotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div class="summary-row" style="color: #10b981; font-size: 0.95rem;">
                <span>Desconto</span>
                <span>R$ 0,00</span>
            </div>
            <div class="summary-total">
                <span>Total</span>
                <span>R$ ${valorTotal.toFixed(2).replace('.', ',')}</span>
            </div>
        `;
        divConta.innerHTML = subtotalHtml;
        
        document.querySelector('.clear').innerHTML = `
            <button onclick="limparCarrinho()" style="margin-top: 1.5rem; padding: 0.5rem 1rem; color: var(--text-muted); background: var(--bg-off); border-radius: 6px; font-size: 0.9rem; float: right; transition: all 0.2s;">
                <i class="fa-solid fa-trash-can"></i> Limpar carrinho
            </button>
        `;
        
        let formaPagamentoEl = document.querySelector('.formaPagamento');
        if(formaPagamentoEl) {
            formaPagamentoEl.innerHTML = `
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text-main);">Selecione a forma de pagamento</label>
                <select id="pagamento" name="pagamento" style="width: 100%; padding: 0.85rem; border-radius: var(--radius-md); border: 1px solid var(--border); background: white; margin-bottom: 1.5rem; outline: none;">
                    <option value="cartao">Cartão de Crédito</option>
                    <option value="boleto">Boleto Bancário</option>
                    <option value="pix">PIX</option>
                </select>
            `;
            
            // Only append the finalize button if it's not already in the EJS layout, or replace it
            const existingBtn = document.querySelector('.btn-checkout');
            if (existingBtn) {
                existingBtn.onclick = comprar;
            } else {
                formaPagamentoEl.innerHTML += `
                    <button id="finalizar-compra" onclick="comprar()" class="btn-checkout" style="display: block; width: 100%; padding: 1.25rem; background-color: var(--accent); color: white; text-align: center; border-radius: var(--radius-md); font-size: 1.1rem; font-weight: 600; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s;">
                        Finalizar Compra <i class="fa-solid fa-arrow-right" style="margin-left: 0.5rem;"></i>
                    </button>
                    <div style="text-align: center; margin-top: 1rem;">
                        <a href="/#produtos" style="color: var(--text-muted); font-size: 0.9rem; text-decoration: underline;">Continuar comprando</a>
                    </div>
                `;
            }
        }
        
    } else {
        divConteiner.innerHTML = `
            <div style="text-align: center; padding: 4rem 0;">
                <i class="fa-solid fa-cart-arrow-down" style="font-size: 4rem; color: var(--border); margin-bottom: 1.5rem;"></i>
                <h2 style="color: var(--text-main); margin-bottom: 1rem;">Seu carrinho está vazio</h2>
                <p style="color: var(--text-muted); margin-bottom: 2rem;">Adicione produtos para continuar comprando.</p>
                <a href="/#produtos" class="btn-primary" style="padding: 0.75rem 2rem; background: var(--primary); color: white; border-radius: 30px;">Explorar Produtos</a>
            </div>
        `;
        divConta.innerHTML = `
            <div style="text-align: center; color: var(--text-muted); padding: 2rem 0;">
                <p>Nenhum item selecionado.</p>
                <div class="summary-total" style="margin-top: 1rem;">
                    <span>Total</span>
                    <span>R$ 0,00</span>
                </div>
            </div>
        `;
        document.querySelector('.clear').innerHTML = '';
        let formaPagamentoEl = document.querySelector('.formaPagamento');
        if(formaPagamentoEl) formaPagamentoEl.innerHTML = '';
        const existingBtn = document.querySelector('.btn-checkout');
        if(existingBtn) existingBtn.style.display = 'none';
    }
}

function removerDoCarrinho(id){
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho = carrinho.filter(c => c.id != id);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    montarCarrinho();
}

function limparCarrinho(){
    localStorage.removeItem('carrinho');
    montarCarrinho();
}

function comprar(){
    let json = [];
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    if(carrinho.length > 0){
        let valorTotal = 0;
        carrinho.forEach(c => valorTotal += parseFloat(c.preco) * parseInt(c.quantidade));
        
        carrinho.forEach(c =>{
            json.push({
                idProduto: c.id,
                nomeProduto: c.nome,
                quantidade: c.quantidade,
                valorUnitario: c.preco,
                valorTotal: valorTotal
            });
        });
        
        fetch('/pedido/registerPedido',{
            method: 'POST',
            headers: { 'Content-type':'application/json' },
            body: JSON.stringify({json})
        })
        .then(r => r.json())
        .then(r => {
            if(r.ok){
                alert("Pedido realizado com sucesso!");
                limparCarrinho();
                window.location.href = "/";
            }else{
                alert(r.msg || "Erro ao finalizar pedido.");
            }
        })
        .catch(e => {
            console.error(e);
            alert("Erro de conexão ao finalizar o pedido.");
        });
    } 
}

document.addEventListener('DOMContentLoaded', function(){
    montarCarrinho();
});