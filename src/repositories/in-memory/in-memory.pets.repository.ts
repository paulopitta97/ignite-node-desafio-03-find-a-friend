import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets.repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      category: data.category,
      org_id: data.org_id,
      created_at: new Date(),
    }

    this.items.push(pet)
    return pet
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)
    if (!pet) {
      return null
    }
    return pet
  }

  /*async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }*/

}
