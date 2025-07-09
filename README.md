# Server

Servidor Fastify com Drizzle ORM e PostgreSQL.

## Configuração

1. Copie `.env.exemple` para `.env` e preencha as variáveis:

   ```
   PORT=
   DATABASE_URL=
   ```

2. Instale as dependências:

   ```
   npm ci
   ```

3. Suba o banco de dados com Docker:

   ```
   docker-compose up -d
   ```

4. Rode as migrações no banco:
   ```
   npx drizzle-kit generate
   ```

   ```
      npx drizzle-kit migrate
   ```

5. Popule o banco com dados fakes:

   ```
      npm run db:seed
   ```

## Executando o servidor

- Em modo desenvolvimento (hot reload):

  ```
  npm run dev
  ```

- Em modo produção:
  ```
  npm start
  ```

O servidor estará disponível na porta definida em `PORT`.
