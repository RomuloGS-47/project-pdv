# Sistema SAVE - Ponto de Venda para Lanchonete

![PDV Simples](https://img.shields.io/badge/PDV_Simples-Lanchonete-brightgreen)
![Tecnologia](https://img.shields.io/badge/Tecnologia-Vanilla_JS-yellow)
![Firebase](https://img.shields.io/badge/Backend-Firebase-orange)
![UI](https://img.shields.io/badge/UI-Tailwind_CSS-blue)

Um sistema de Ponto de Venda (PDV) simples e eficiente, projetado para pequenas lanchonetes e comércios. Desenvolvido com HTML, CSS e JavaScript puro, utilizando o Firebase como backend para armazenamento de dados em tempo real.

## ✨ Funcionalidades

-   **Frente de Caixa (PDV):** Adicione produtos a um carrinho de compras de forma rápida e intuitiva.
-   **Gestão de Estoque:** Cadastre novos produtos, ajuste valores e controle a quantidade de itens disponíveis. O sistema alerta visualmente quando um item está com estoque baixo.
-   **Relatório Diário:** Visualize o total de faturamento do dia e uma lista de todas as vendas realizadas.
-   **Dados em Tempo Real:** O estoque e as vendas são sincronizados em tempo real com o Firebase, permitindo que o sistema seja usado em múltiplos caixas simultaneamente.
-   **Modo de Teste Local:** O sistema pode ser executado localmente sem a necessidade de uma conexão com o Firebase, utilizando dados de exemplo para facilitar o desenvolvimento e testes.

## 🚀 Tecnologias Utilizadas

-   **Frontend:**
    -   HTML5
    -   CSS3 com [Tailwind CSS](https://tailwindcss.com/) (via CDN)
    -   JavaScript (ES6 Modules)
-   **Backend:**
    -   [Firebase](https://firebase.google.com/) (Firestore para banco de dados e Authentication para login anônimo)

## 📂 Estrutura do Projeto

O projeto é organizado da seguinte forma para facilitar a manutenção:

```
project-pdv/
├── css/
│   └── style.css           # Estilos customizados
├── js/
│   ├── app.js              # Lógica principal da aplicação e eventos
│   ├── firebaseService.js  # Interação com o Firebase
│   ├── state.js            # Gerenciamento de estado
│   └── ui.js               # Funções de renderização e manipulação do DOM
├── .gitignore
├── firebase-config.example.js # Arquivo de exemplo para a configuração do Firebase
├── firebase-config.js         # (Ignorado pelo Git) Suas credenciais do Firebase
└── index.html                 # Arquivo principal da interface
```

## ⚙️ Instalação e Uso

Para executar o projeto localmente, siga estes passos:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/project-pdv.git
    cd project-pdv
    ```

2.  **Configure o Firebase:**
    -   Crie um projeto no [console do Firebase](https://console.firebase.google.com/).
    -   Adicione um novo aplicativo da Web ao seu projeto.
    -   Copie o objeto de configuração do Firebase.
    -   Renomeie o arquivo `firebase-config.example.js` para `firebase-config.js`.
    -   Cole o objeto de configuração do Firebase dentro de `firebase-config.js`, substituindo os valores de exemplo.

3.  **Habilite os Serviços do Firebase:**
    -   No console do Firebase, vá para **Authentication** -> **Sign-in method** e habilite o provedor **Anônimo**.
    -   Vá para **Firestore Database** e crie um novo banco de dados em modo de produção.

4.  **Abra o `index.html`:**
    -   Abra o arquivo `index.html` em seu navegador de preferência. Para uma melhor experiência e para que os módulos JavaScript funcionem corretamente, é recomendado usar um servidor local. Você pode usar a extensão "Live Server" no VS Code ou executar um simples servidor Python:
      ```bash
      # Se você tiver Python 3.x
      python -m http.server
      ```
    -   Acesse `http://localhost:8000` no seu navegador.

O sistema está pronto para ser usado!

---
_Este projeto foi desenvolvido como uma solução prática e de código aberto para pequenos negócios._
