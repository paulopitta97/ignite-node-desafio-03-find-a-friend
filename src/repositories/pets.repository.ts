import { Category, Pet, Prisma } from '@prisma/client'

export interface FindAllParams {
  city: string
  age?: string
  category?: Category
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findAll(params: FindAllParams, page: number): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
