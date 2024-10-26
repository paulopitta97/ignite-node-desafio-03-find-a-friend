import { CreateOrgUseCase } from '../create-org'
import { PrismaOrgsRepository } from '@/repositories/prisma/prima.orgs.repository'

export function makeCreateOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new CreateOrgUseCase(orgsRepository)
  return useCase
}
