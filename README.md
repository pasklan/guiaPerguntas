# Guia de Perguntas

### Projeto Pessoal de estudo 'Perguntas e Respostas'

Criado para estudos de NodeJS, docker, express, sequelize e EJS.

## Como funciona

1- Ao solicitar uma requisição na rota raiz `/`, uma lista de perguntas é listada, junto com um botão _Perguntar_. Se não houver perguntas no banco de dados, nada será exibido.

2- Para fazer uma pergunta basta clicar em _Perguntas_, a rota será mudada para `/perguntar`, onde será possível dar um título e uma descrição da pergunta. Clicando no botão `Perguntar`, os dados serão salvos e haverá redirecionamento para a rota que salva a pergunta no banco de dados MYSQL `/saveQuestion`, após salvar haverá novo redirecionamento para a rota raiz.

3- _Respondendo Perguntas_: Quando uma pergunta é listada, junto a ela temos um botão `Responder`. Onde é possível enviar respostas para a pergunta. A rota acessada é `/pergunta/id` onde `id` se refere ao id que é recuperado da pergunta salva no banco. Basta descrever a resposta e clicar em `Responder` para enviar uma resposta que será salva no banco usando a rota `/responder` e após isso a resposta poderá ser visualizada abaixo da pergunta.
