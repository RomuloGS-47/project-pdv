import { setState, getState } from './state.js';
import { renderAll, showModal } from './ui.js';

let db, auth;
let firebase;

export async function initFirebase() {
    try {
        const firebaseAppModule = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js");
        const firebaseAuthModule = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js");
        const firestoreModule = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js");
        const configModule = await import('../firebase-config.js');

        firebase = {
            initializeApp: firebaseAppModule.initializeApp,
            getAuth: firebaseAuthModule.getAuth,
            signInAnonymously: firebaseAuthModule.signInAnonymously,
            onAuthStateChanged: firebaseAuthModule.onAuthStateChanged,
            getFirestore: firestoreModule.getFirestore,
            doc: firestoreModule.doc,
            setDoc: firestoreModule.setDoc,
            onSnapshot: firestoreModule.onSnapshot,
            collection: firestoreModule.collection,
            query: firestoreModule.query,
            where: firestoreModule.where,
            Timestamp: firestoreModule.Timestamp,
            addDoc: firestoreModule.addDoc,
            updateDoc: firestoreModule.updateDoc,
        };

        const app = firebase.initializeApp(configModule.firebaseConfig);
        db = firebase.getFirestore(app);
        auth = firebase.getAuth(app);
        setState({ appId: configModule.firebaseConfig.appId });

        await firebase.signInAnonymously(auth);
        return new Promise(resolve => {
            firebase.onAuthStateChanged(auth, (user) => {
                if (user) {
                    setState({ userId: user.uid });
                    resolve(user);
                }
            });
        });
    } catch (error) {
        console.warn("Falha na inicialização do Firebase:", error);
        setState({ isLocalTestMode: true });
        return null;
    }
}

const getCollectionPath = (name) => `/artifacts/${getState().appId}/public/data/${name}`;

// IMPORTANTE: Certifique-se de configurar as Regras de Segurança do Firebase
// para proteger seus dados. Por exemplo, para permitir apenas leitura/escrita
// autenticada ou baseada em permissões específicas.
// Exemplo de regras para Firestore:
// match /artifacts/{appId}/public/data/{collection}/{document} {
//   allow read, write: if request.auth != null;
// }

export function listenToEstoque() {
    firebase.onSnapshot(firebase.collection(db, getCollectionPath('estoque')), (snapshot) => {
        const estoque = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setState({ estoque });
        renderAll();
    });
}

export function listenToVendasDiarias() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const q = firebase.query(firebase.collection(db, getCollectionPath('vendas')), firebase.where('timestamp', '>=', firebase.Timestamp.fromDate(today)));
    firebase.onSnapshot(q, (snapshot) => {
        const vendas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setState({ vendas });
        renderAll();
    });
}

export async function saveProductToFirebase(nome, valor, quantidade) {
    try {
        await firebase.setDoc(firebase.doc(db, getCollectionPath('estoque'), nome), { nome, valor, quantidade });
        showModal("Sucesso", `Produto '${nome}' salvo!`);
    } catch (e) {
        showModal("Erro", "Falha ao salvar o produto.");
    }
}

export async function finalizeSaleInFirebase(venda, carrinho) {
    const { estoque } = getState(); // Pega o estado atual do estoque
    await firebase.addDoc(firebase.collection(db, getCollectionPath('vendas')), venda);
    for (const itemVendido of carrinho) {
        const itemEstoque = estoque.find(e => e.id === itemVendido.id);
        if (itemEstoque) {
            // CORREÇÃO: Calcula a nova quantidade baseada no estoque atual
            const newQty = Math.max(0, itemEstoque.quantidade - itemVendido.quantidade);
            await firebase.updateDoc(firebase.doc(db, getCollectionPath('estoque'), itemVendido.id), { quantidade: newQty });
        }
    }
}

export function getFirebaseTimestamp() {
    return firebase.Timestamp.now();
}