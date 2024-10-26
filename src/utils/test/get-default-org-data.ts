import { Org } from '@prisma/client'
import bcrypt from 'bcryptjs';

interface OrgWithClearPassword extends Org {
  clear_password: string;
}

export async function getDefaultOrgData(): Promise<OrgWithClearPassword> {
    return {
      name: 'Fake ORG 1',
      email: 'fakeorg@devxpto.com',
      whatsapp: '123456',
      password: await bcrypt.hash('fakepassword', 6),
      cep: "01153-000",
      state: "São Paulo",
      city: "São Paulo",
      neighborhood: "Barra Funda",
      street: "Rua Vitorino Carmilo",
      clear_password: "fakepassword",

      created_at: new Date(), // Defina a data de criação
      id: 'nao-utilizado', // Adicione um ID único ou use `uuid` para gerar dinamicamente
    }
}