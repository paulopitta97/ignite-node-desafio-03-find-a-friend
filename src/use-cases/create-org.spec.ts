import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgUseCase } from './create-org'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory.orgs.repository'
import { getDefaultOrgData } from '@/utils/test/get-default-org-data'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create ORG Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create ORG', async () => {
    let data = await getDefaultOrgData();
    const { org } = await sut.execute(data)

    expect(org.id).toEqual(expect.any(String))
  })
})
