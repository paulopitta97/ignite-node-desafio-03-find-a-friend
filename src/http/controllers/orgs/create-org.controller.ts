import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  console.log( request.body )
  const createOrgBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    whatsapp: z.string().nullable(),
    password: z.string(),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
  })

  const { name, email, whatsapp, password, cep, state, city, neighborhood, street } =
    createOrgBodySchema.parse(request.body)

  const createOrgUseCase = makeCreateOrgUseCase()

  const { org } = await createOrgUseCase.execute({
    name, email, whatsapp, password, cep, state, city, neighborhood, street
  })

  return reply.status(201).send( { ...org, password: undefined } )
}
