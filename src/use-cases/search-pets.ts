import { PetsRepository } from "@/repositories/pets.repository"
import { Category, Pet } from "@prisma/client"

interface SearchPetsUseCaseRequest {
  city: string
  age?: string
  category?: Category
  page: number
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    category,
    page,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findAll({ city, age, category }, page)
    return {
      pets,
    }
  }
}
