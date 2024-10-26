import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory.orgs.repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { getDefaultOrgData } from '@/utils/test/get-default-org-data'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase
// SUT = System Under Test

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    let data = await getDefaultOrgData();
    await orgsRepository.create(data)

    const { org } = await sut.execute({
      email: data.email,
      password: data.clear_password,
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should be not able to authenticate with wrong email', async () => {
    let data = await getDefaultOrgData();
    await expect(() =>
      sut.execute({
        email: 'wrong_email@example.com',
        password: data.clear_password,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be not able to authenticate with wrong password', async () => {
    let data = await getDefaultOrgData();
    await orgsRepository.create(data)

    await expect(() =>
      sut.execute({
        email: data.email,
        password: 'wrongpassword',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
