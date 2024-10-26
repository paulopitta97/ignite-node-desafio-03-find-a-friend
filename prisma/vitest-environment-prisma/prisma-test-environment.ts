import 'dotenv/config'
import { execSync } from 'child_process'
import { randomUUID } from 'crypto'
import { Environment } from 'vitest/environments';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Habilitando logging do Prisma
})

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr', // Adiciona o modo de transformação requerido pelo Vitest
  async setup() {
    const schema = randomUUID()

    const newURL = generateDatabaseURL(schema)
    process.env.DATABASE_URL = newURL

    try {
      // Usando migrate reset para garantir a criação de todas as tabelas no novo schema
      // Mudança: Force a criação do schema e tabela
      console.log(`Applying migrations for schema: ${schema}`);
      execSync('npx prisma migrate reset --force');
      execSync('npx prisma migrate deploy')
      console.log('Migrations applied successfully.');
      console.log(`Database URL: ${process.env.DATABASE_URL}`);
      
      const tables = await prisma.$executeRaw`SELECT table_name FROM information_schema.tables WHERE table_schema = '${schema}'`;
      console.log(tables);

    } catch (error) {
      console.error('Failed to reset and migrate database:', error);
    }

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
}
