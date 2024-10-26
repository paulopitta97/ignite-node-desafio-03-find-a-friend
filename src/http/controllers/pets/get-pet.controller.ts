import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const validateGetPetParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = validateGetPetParamsSchema.parse(request.params)

  const getPet = makeGetPetUseCase()

  const { pet } = await getPet.execute({ petId })

  return reply.status(200).send( pet )
}
