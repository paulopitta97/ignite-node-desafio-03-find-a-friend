import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { getDefaultOrgData } from '@/utils/test/get-default-org-data'
import { GetPetUseCase } from './get-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory.pets.repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory.orgs.repository'
import { getDefaultPetData } from '@/utils/test/get-default-pet-data'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: GetPetUseCase
// SUT = System Under Test

describe('Get PET Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get an pet', async () => {
    let data = await getDefaultOrgData();
    const createdOrg = await orgsRepository.create(data)

    let petData = getDefaultPetData(createdOrg.id);
    const createdPet = await petsRepository.create(petData)

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual(petData.name)
  })

  it('should be not able to get an pet with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
