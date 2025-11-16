# Contribuindo

Obrigado por considerar contribuir para o projeto **project-pdv**! Abaixo estão algumas orientações rápidas para facilitar contribuições úteis e organizadas.

## Como começar

1. Fork este repositório e clone para sua máquina:

```bash
git clone https://github.com/<seu-usuario>/project-pdv.git
cd project-pdv
```

2. Crie uma branch para sua feature/bugfix:

```bash
git checkout -b feat/nome-da-feature
# ou
git checkout -b fix/descricao-do-bug
```

3. Faça alterações, escreva código limpo e testável.

4. Faça commit com mensagens descritivas (imperativo):

```bash
git add .
git commit -m "feat: adiciona modo dark"
```

5. Abra um Pull Request descrevendo a motivação, o que foi alterado e como testar.

## Padrões e recomendações
- Mantenha o código legível e com nomes descritivos.
- Prefira mudanças pequenas e atômicas (um PR por feature/bugfix).
- Teste suas alterações localmente antes de abrir o PR.

## Testes e verificação manual

O projeto é front-end estático. Para rodar localmente, use um servidor estático (por exemplo `python -m http.server` ou `npx serve .`) e acesse `http://localhost:8000`.

## Issues

Antes de abrir uma issue, procure por issues existentes. Ao abrir, descreva passos para reproduzir o problema ou um caso de uso para uma nova funcionalidade.

## Código de Conduta

Contribuições implicam concordância com um ambiente de colaboração respeitoso. Comportamento abusivo não será tolerado.

---

Se quiser, posso também abrir templates mais detalhados para issues/PRs ou configurar Actions básicas de CI.
