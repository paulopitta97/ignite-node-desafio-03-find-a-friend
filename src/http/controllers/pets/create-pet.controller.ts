import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  try {

    const createPetBodySchema = z.object({
      name: z.string(),
      about: z.string(),
      age: z.string(),
      category: z.enum(["DOG", "CAT"])
    })
  
    const { name, about, age, category } = createPetBodySchema.parse(request.body)
  
    const createPetUseCase = makeCreatePetUseCase()
  
    const org_id = request.user.sub;

    const { pet } = await createPetUseCase.execute({
      name, about, age, category, org_id
    })
    return reply.status(201).send( pet );

  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    console.error(error)
    return reply.status(500).send({ message: 'Internal server error' })
  }

}
