import { Pet, Prisma } from '@prisma/client'
import { FindAllParams, PetsRepository } from '../pets.repository'
import { randomUUID } from 'crypto'
import { InMemoryOrgsRepository } from './in-memory.orgs.repository'

export class InMemoryPetsRepository implements PetsRepository {

  public items: Pet[] = []

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

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

  async findAll(params: FindAllParams, page: number): Promise<Pet[]> {
    const orgsByCity = this.orgsRepository.items.filter(
      (org) => org.city === params.city,
    )

    return this.items
      .filter((item) => orgsByCity.some((org) => org.id === item.org_id))
      .filter((item) => (params.age ? item.age === params.age : true))
      .filter((item) => (params.category ? item.category === params.category : true))
      .slice((page - 1) * 20, page * 20)
  }

}
