import { Pet, Prisma } from '@prisma/client'
import { FindAllParams, PetsRepository } from '../pets.repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data })
    return pet
  }

  async findAll(params: FindAllParams, page: number): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        age: params.age,
        category: params.category,
        org: {
          city: {
            contains: params.city,
            mode: 'insensitive',
          },
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id },
    })
    return pet
  }

}
