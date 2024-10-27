import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'

const querySchema = z.object({
  city: z.string().min(1),
  age: z.string().optional(),
  category: z.enum(["DOG", "CAT"]).optional(),
  page: z.coerce.number().min(1).default(1),
})

export async function search(request: FastifyRequest, reply: FastifyReply) {

  const { city, age, category, page } = querySchema.parse( request.query )

  const searchPetsUseCase = makeSearchPetsUseCase()

  const { pets } = await searchPetsUseCase.execute({ city, age, category, page })

  return reply.status(200).send( pets )
}
