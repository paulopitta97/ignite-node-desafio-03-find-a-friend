import { PrismaOrgsRepository } from '@/repositories/prisma/prima.orgs.repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const authenticateUseCase = new AuthenticateUseCase(prismaOrgsRepository)
  return authenticateUseCase
}
