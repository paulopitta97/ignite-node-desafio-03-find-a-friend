import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs.repository'
import { randomUUID } from 'crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      whatsapp: data.whatsapp ?? null,
      password: data.password,
      cep: data.cep,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
      created_at: new Date(),
    }
    this.items.push(org)
    return org
  }

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)
    if (!org) {
      return null
    }
    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  /*async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }*/

}
