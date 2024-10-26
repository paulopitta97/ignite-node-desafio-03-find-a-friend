import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory.orgs.repository'
import { GetOrgUseCase } from './get-org'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { getDefaultOrgData } from '@/utils/test/get-default-org-data'

let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgUseCase
// SUT = System Under Test

describe('Get Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgUseCase(orgsRepository)
  })

  it('should be able to get an org', async () => {
    let data = await getDefaultOrgData();
    const createdOrg = await orgsRepository.create(data)

    const { org } = await sut.execute({
      orgId: createdOrg.id,
    })

    expect(org.id).toEqual(expect.any(String))
    expect(org.name).toEqual(data.name)
  })

  it('should be not able to get an org with wrong id', async () => {
    await expect(() =>
      sut.execute({
        orgId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
