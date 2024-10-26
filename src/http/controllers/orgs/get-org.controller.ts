import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetOrgUseCase } from '@/use-cases/factories/make-get-org-use-case'

export async function getOrg(request: FastifyRequest, reply: FastifyReply) {
  const validateGetOrgParamsSchema = z.object({
    orgId: z.string().uuid(),
  })

  const { orgId } = validateGetOrgParamsSchema.parse(request.params)

  const getOrg = makeGetOrgUseCase()

  const { org } = await getOrg.execute({ orgId })

  return reply.status(200).send({ ...org, password: undefined })
}
