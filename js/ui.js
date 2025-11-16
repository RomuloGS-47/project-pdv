import { getState, removeFromCarrinho } from './state.js';

// --- Referências DOM ---
export const dom = {
    userIdDisplay: document.getElementById('user-id-display'),
    produtoSelect: document.getElementById('produto-select'),
    carrinhoLista: document.getElementById('carrinho-lista'),
    totalVendaDisplay: document.getElementById('total-venda'),
    btnFinalizarVenda: document.getElementById('btn-finalizar-venda'),
    estoqueLista: document.getElementById('estoque-lista'),
    faturamentoTotalDisplay: document.getElementById('faturamento-total'),
    relatorioVendasLista: document.getElementById('relatorio-vendas-lista'),
    loadingScreen: document.getElementById('loading'),
    appModal: document.getElementById('app-modal'),
    testModeBanner: document.getElementById('test-mode-banner'),
    modalTitle: document.getElementById('modal-title'),
    modalBody: document.getElementById('modal-body'),
    quantidadeInput: document.getElementById('quantidade-input'),
    estoqueNomeInput: document.getElementById('estoque-nome'),
    estoqueValorInput: document.getElementById('estoque-valor'),
    estoqueQuantidadeInput: document.getElementById('estoque-quantidade'),
};

// --- Funções de Utilidade de UI ---
export const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export function showModal(title, body) {
    dom.modalTitle.textContent = title;
    dom.modalBody.textContent = body;
    dom.appModal.classList.remove('hidden');
}

export function hideModal() {
    dom.appModal.classList.add('hidden');
}

export function showSection(sectionId) {
    document.querySelectorAll('.section-content').forEach(s => s.classList.add('hidden'));
    const section = document.getElementById(`section-${sectionId}`);
    if (section) {
        section.classList.remove('hidden');
    }
    document.querySelectorAll('.tab-button').forEach(b => {
        b.classList.remove('border-green-500', 'text-green-600');
        b.classList.add('border-transparent', 'text-gray-500');
    });
    document.getElementById(`tab-${sectionId}`).classList.add('border-green-500', 'text-green-600');
}

// --- Funções de Renderização ---
export function renderEstoque() {
    const { estoque } = getState();
    dom.estoqueLista.innerHTML = estoque.length === 0
        ? '<p class="italic">Nenhum item no estoque.</p>'
        : estoque.map(item => `
            <div class="p-3 bg-white rounded-lg border flex justify-between items-center shadow-sm">
                <div>
                    <p class="font-semibold">${item.nome}</p>
                    <p class="text-sm text-gray-600">Valor: ${formatCurrency(item.valor)}</p>
                </div>
                <span class="text-lg font-bold ${item.quantidade < 5 ? 'text-red-500' : 'text-green-600'}">
                    Qtd: ${item.quantidade}
                </span>
            </div>
        `).join('');
}

export function renderProdutosSelect() {
    const { estoque } = getState();
    dom.produtoSelect.innerHTML = estoque.map(item =>
        `<option value="${item.id}">${item.nome} (${formatCurrency(item.valor)})</option>`
    ).join('');
    dom.produtoSelect.disabled = estoque.length === 0;
}

export function renderCarrinho() {
    const { carrinho } = getState();
    if (carrinho.length === 0) {
        dom.carrinhoLista.innerHTML = '<li class="italic">Carrinho vazio.</li>';
    } else {
        dom.carrinhoLista.innerHTML = carrinho.map((item, index) => `
            <li class="flex justify-between items-center p-2 bg-white rounded-md shadow-sm">
                <span>${item.nome} (${item.quantidade}x)</span>
                <span>${formatCurrency(item.valor * item.quantidade)}</span>
                <button onclick="window.app.removerDoCarrinho(${index})" class="text-red-500 hover:text-red-700">&times;</button>
            </li>
        `).join('');
    }
    const total = carrinho.reduce((sum, item) => sum + item.valor * item.quantidade, 0);
    dom.totalVendaDisplay.textContent = formatCurrency(total);
    dom.btnFinalizarVenda.disabled = carrinho.length === 0;
}

export function renderRelatorio() {
    const { vendas } = getState();
    const total = vendas.reduce((sum, v) => sum + v.total, 0);
    dom.faturamentoTotalDisplay.textContent = formatCurrency(total);
    dom.relatorioVendasLista.innerHTML = vendas.length === 0
        ? '<p class="italic">Nenhuma venda hoje.</p>'
        : vendas.map(v => `
            <div class="p-2 border-b">
                <span>ID: ${v.id.substring(0, 5)}...</span> |
                <span>Total: ${formatCurrency(v.total)}</span> |
                <span>Itens: ${v.itens.map(i => i.nome).join(', ')}</span>
            </div>
        `).join('');
}

export function renderAll() {
    renderEstoque();
    renderProdutosSelect();
    renderCarrinho();
    renderRelatorio();
}
