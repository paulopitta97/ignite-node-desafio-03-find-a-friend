import { beforeEach, describe, expect, it } from 'vitest'
import { getDefaultOrgData } from '@/utils/test/get-default-org-data'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory.pets.repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory.orgs.repository'
import { getDefaultPetData } from '@/utils/test/get-default-pet-data'
import { SearchPetsUseCase } from './search-pets'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase
// SUT = System Under Test

describe('Search PETS Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search pets by city', async () => {
    let data = await getDefaultOrgData();
    const createdOrg = await orgsRepository.create(data)

    let petData = getDefaultPetData(createdOrg.id);
    const createdPet = await petsRepository.create(petData)

    const { pets } = await sut.execute({ city: createdOrg.city, page: 1 })
    expect(pets).toHaveLength(1)
  })

  it('should be able to search pets by city and age', async () => {
    let data = await getDefaultOrgData();
    const createdOrg = await orgsRepository.create(data)

    let petData = getDefaultPetData(createdOrg.id);
    const createdPet = await petsRepository.create(petData)

    const { pets } = await sut.execute({ city: createdOrg.city, page: 1, age: createdPet.age })
    expect(pets).toHaveLength(1)
  })

  it('should be able to search pets by city and category', async () => {
    let data = await getDefaultOrgData();
    const createdOrg = await orgsRepository.create(data)

    let petData = getDefaultPetData(createdOrg.id);
    const createdPet = await petsRepository.create(petData)

    const { pets } = await sut.execute({ city: createdOrg.city, page: 1, category: createdPet.category })
    expect(pets).toHaveLength(1)
  })
})
