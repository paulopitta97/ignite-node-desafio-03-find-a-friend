import { Category, Pet } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs.repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { PetsRepository } from '@/repositories/pets.repository'

interface CreatePetUseCaseRequest {
  name: string
  id: string
  about: string
  age: string
  category: Category
  org_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    category,
    org_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {

    const org = await this.orgsRepository.findById(org_id)
    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      category,
      org_id,
    })

    return {
      pet,
    }
  }
}
