## Ignite NodeJS da Rocketseat 🚀

### Projeto desenvolvido como 'Desafio 03' do Módulo 'Implementando o SOLID' no Bootcamp Ignite da Rocketseat. 

![banner-ignite-nodejs-600x-42e1ab80-77af-11eb-9e07-47f9e46b3e6e](https://user-images.githubusercontent.com/52472087/224563992-1fbf29d0-06d9-4b58-b9d0-522f3f283f1e.png)

- Consiste em uma API RESTful com Node.js para a adoção de animais com `Fastify`, `Prisma` (com `Migrations`), `Zod`, etc.
- Foram utilizadas `eslint`, `dotenv`, entre outros. Banco de dados relacional `Postgre`.
- Foram realizados testes com `vitest` e `supertest`. Também foi usado o `Docker`.

### Regras da aplicação ✔️

- Deve ser possível cadastrar um pet ✔️
- Deve ser possível listar todos os pets disponíveis para adoção em uma cidade ✔️
- Deve ser possível filtrar pets por suas características(categoria) ✔️
- Deve ser possível visualizar detalhes de um pet para adoção ✔️
- Deve ser possível se cadastrar como uma ORG ✔️
- Deve ser possível realizar login como uma ORG ✔️

### Regras de negócio ✔️

- Para listar os pets, obrigatoriamente precisamos informar a cidade ✔️
- Todos os filtros, além da cidade, são opcionais 👍
- Uma ORG precisa ter um endereço e um número de WhatsApp 👍
- Um pet deve estar ligado a uma ORG ✔️
- O usuário que quer adotar, entrará em contato com a ORG via WhatsApp ✔️
- Para uma ORG acessar a aplicação como admin, ela precisa estar logada ✔️

### Rotas

- [x] `GET /orgs/{id}` -> with id
- [x] `POST /orgs` - `id`, `name`, `address`, `whatsapp` -> register
- [x] `POST /orgs/authenticate` -> authenticate

- [x] `GET /orgs/pets` -> search - parâmetros: `city: (string) obrigatório`
- [x] `GET /orgs/pets/{id}` -> with id
- [x] `POST /orgs/pets` - `id`, `name`, `age`, `category` (dog/cat) -> com verificação de jwt

### Configurando e executando:

- `docker compose up -d`
- `npm install`
- `npx prisma db push`
- `npx prisma migrate deploy`
- `npm run start:dev`

## Para Rodar os Testes E2E (Controllers):

- `npm run pretest:e2e`
- `npm run test:e2e`

![e2e-controllers-tests](https://github.com/user-attachments/assets/e8cd9947-7cb2-4e6d-bea0-ab14c4ff59c6)

## Para Rodar os Testes Unitários (Use Cases):

- `npm run test`

![use-cases-tests](https://github.com/user-attachments/assets/373893a1-eb31-461d-a7b3-293c891420c1)

### 📝 Licença

- [MIT](https://github.com/paulopitta97/ignite-node-desafio-03-find-a-friend/blob/master/LICENSE) © [Paulo Pitta](https://github.com/paulopitta97)
