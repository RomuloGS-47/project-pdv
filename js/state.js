let state = {
    isLocalTestMode: false,
    userId: "local-user",
    estoque: [],
    carrinho: [],
    vendas: [],
    appId: 'local-test-app'
};

export function getState() {
    return state;
}

export function setState(newState) {
    state = { ...state, ...newState };
}

export function addToCarrinho(item, quantidade) {
    const itemCarrinho = state.carrinho.find(i => i.id === item.id);
    if (itemCarrinho) {
        itemCarrinho.quantidade += quantidade;
    } else {
        state.carrinho.push({ ...item, quantidade });
    }
}

export function removeFromCarrinho(index) {
    state.carrinho.splice(index, 1);
}

export function clearCarrinho() {
    state.carrinho = [];
}
