import { Org } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs.repository'
import { AlreadyExistsError } from './errors/already-exists-error'
import bcrypt from 'bcryptjs';

interface CreateOrgUseCaseRequest {
  name: string
  email: string
  whatsapp: string | null
  password: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    whatsapp,
    password,
    cep,
    state,
    city,
    neighborhood,
    street,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new AlreadyExistsError()
    }
  
    password = await bcrypt.hash(password, 6)

    const org = await this.orgsRepository.create({
      name,
      email,
      whatsapp,
      password,
      cep,
      state,
      city,
      neighborhood,
      street,
    })

    return {
      org,
    }
  }
}
