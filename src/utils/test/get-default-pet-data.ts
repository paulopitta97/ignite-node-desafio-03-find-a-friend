import { Org, Pet } from '@prisma/client'
import { randomUUID } from 'crypto'

export function getDefaultPetData(orgId?: string): Pet {
    return {
      name: 'Fake Doguinho 1',
      about: 'Sobre o cachorro Doguinho 1',
      age: '2',
      category: "DOG",
      created_at: new Date(), // Defina a data de criação
      id: 'nao-utilizado', // Adicione um ID único ou use `uuid` para gerar dinamicamente
      org_id: orgId ?? randomUUID(),
    }
}