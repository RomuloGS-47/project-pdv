import { getState, setState, addToCarrinho, removeFromCarrinho, clearCarrinho } from './state.js';
import { dom, showModal, hideModal, showSection, renderCarrinho, renderAll } from './ui.js';
import { initFirebase, listenToEstoque, listenToVendasDiarias, saveProductToFirebase, finalizeSaleInFirebase, getFirebaseTimestamp } from './firebaseService.js';

// --- LÓGICA DE INICIALIZAÇÃO ---
async function initApp() {
    dom.loadingScreen.classList.remove('hidden');
    dom.userIdDisplay.textContent = getState().userId;

    const user = await initFirebase();

    if (getState().isLocalTestMode) {
        dom.testModeBanner.classList.remove('hidden');
        dom.userIdDisplay.textContent = "Usuário Local";
        loadLocalMockData();
    } else {
        dom.userIdDisplay.textContent = getState().userId.substring(0, 8) + "...";
        listenToEstoque();
        listenToVendasDiarias();
    }
    dom.loadingScreen.classList.add('hidden');
}

function loadLocalMockData() {
    const mockEstoque = [
        { id: "hamburguer", nome: "Hambúrguer Clássico", valor: 15.50, quantidade: 20 },
        { id: "x-bacon", nome: "X-Bacon Especial", valor: 18.00, quantidade: 15 },
        { id: "batata-frita", nome: "Batata Frita (Porção)", valor: 12.00, quantidade: 30 },
        { id: "refrigerante", nome: "Refrigerante Lata", valor: 5.00, quantidade: 50 },
        { id: "suco-natural", nome: "Suco Natural 500ml", valor: 8.00, quantidade: 25 }
    ];
    setState({ estoque: mockEstoque, vendas: [] });
    renderAll();
}

const actions = {
    adicionarAoCarrinho: () => {
        const { estoque } = getState();
        const itemEstoque = estoque.find(i => i.id === dom.produtoSelect.value);
        const quantidade = parseInt(dom.quantidadeInput.value);
        if (!itemEstoque || isNaN(quantidade) || quantidade <= 0) return;

        // VALIDAÇÃO: Verifica se a quantidade desejada está disponível no estoque
        if (itemEstoque.quantidade < quantidade) {
            showModal("Estoque Insuficiente", `Não há quantidade suficiente de "${itemEstoque.nome}" em estoque. Disponível: ${itemEstoque.quantidade}`);
            return;
        }

        addToCarrinho(itemEstoque, quantidade);
        renderCarrinho();
    },
    removerDoCarrinho: (index) => {
        removeFromCarrinho(index);
        renderCarrinho();
    },
    salvarProduto: async () => {
        if (getState().isLocalTestMode) {
            showModal("Aviso", "Em modo de teste, o salvamento de produtos está desativado.");
            return;
        }
        const nome = dom.estoqueNomeInput.value.trim();
        const valor = parseFloat(dom.estoqueValorInput.value);
        const quantidade = parseInt(dom.estoqueQuantidadeInput.value);
        if (!nome || isNaN(valor) || valor <= 0 || isNaN(quantidade) || quantidade < 0) {
            showModal("Erro", "Preencha todos os campos corretamente.");
            return;
        }
        await saveProductToFirebase(nome, valor, quantidade);
    },
    finalizarVenda: async () => {
        const { carrinho, userId, isLocalTestMode } = getState();
        if (isLocalTestMode) {
            showModal("Aviso", "Em modo de teste, a finalização de vendas está desativada.");
            return;
        }
        if (carrinho.length === 0) return;
        const venda = {
            total: carrinho.reduce((sum, item) => sum + item.valor * item.quantidade, 0),
            itens: carrinho.map(i => ({ nome: i.nome, quantidade: i.quantidade, valorUnitario: i.valor })),
            timestamp: getFirebaseTimestamp(),
            caixaId: userId
        };
        try {
            await finalizeSaleInFirebase(venda, carrinho);
            showModal("Sucesso", "Venda finalizada e estoque atualizado!");
            clearCarrinho();
            renderCarrinho();
        } catch (e) {
            showModal("Erro", "Falha ao finalizar a venda.");
        }
    },
    hideModal,
    showSection,
    toggleDarkMode: () => {
        const html = document.documentElement;
        const btn = document.getElementById('btn-dark-mode');
        html.classList.toggle('dark');
        localStorage.setItem('darkMode', html.classList.contains('dark') ? 'true' : 'false');
        btn.textContent = html.classList.contains('dark') ? '☀️ Modo Claro' : '🌙 Modo Escuro';
    }
};
window.app = actions;

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    showSection('vendas');
    renderCarrinho();

    // Carrega preferência de modo escuro
    if (localStorage.getItem('darkMode') === 'true') {
        document.documentElement.classList.add('dark');
        const btn = document.getElementById('btn-dark-mode');
        if (btn) btn.textContent = '☀️ Modo Claro';
    }

    // Adiciona event listener para botão de fechar modal
    const btnModalClose = document.getElementById('btn-modal-close');
    if (btnModalClose) {
        btnModalClose.addEventListener('click', () => window.app.hideModal());
    }

    // --- Event Listeners para Abas ---
    document.getElementById('tab-vendas').addEventListener('click', () => showSection('vendas'));
    document.getElementById('tab-estoque').addEventListener('click', () => showSection('estoque'));
    document.getElementById('tab-relatorio').addEventListener('click', () => showSection('relatorio'));
});