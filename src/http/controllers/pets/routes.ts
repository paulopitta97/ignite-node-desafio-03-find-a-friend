import { FastifyInstance } from 'fastify'
// import { search } from './search-org-controller'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create-pet.controller'
import { getPet } from './get-pet.controller'

export async function petsRoutes(app: FastifyInstance) {
  // app.get('/orgs/search', search)
  app.get('/orgs/pets/:petId', getPet)
  app.post('/orgs/pets', { onRequest: [verifyJWT] }, create)
}
