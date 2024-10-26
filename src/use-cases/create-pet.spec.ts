import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { getDefaultOrgData } from '@/utils/test/get-default-org-data'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory.orgs.repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory.pets.repository'
import { getDefaultPetData } from '@/utils/test/get-default-pet-data'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase

describe('Create PET Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to create PET', async () => {
    // Criando a ORG
    let data = await getDefaultOrgData();
    data = { ...data, password: data.clear_password };
    const org = await orgsRepository.create( data )

    let petData = getDefaultPetData(org.id);
    const { pet } = await sut.execute( petData )

    expect(petsRepository.items).toHaveLength(1)
    expect(pet.id).toEqual(expect.any(String))
  })
})
