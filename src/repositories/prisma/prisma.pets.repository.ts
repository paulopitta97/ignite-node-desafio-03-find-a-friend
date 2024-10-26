import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets.repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data })
    return pet
  }

  /*async searchMany(query: string, page: number) {
    const pets = await prisma.pet.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return pets
  }*/

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id },
    })
    return pet
  }

}
