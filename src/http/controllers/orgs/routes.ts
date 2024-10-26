import { FastifyInstance } from 'fastify'
// import { search } from './search-org-controller'
import { create } from './create-org.controller'
import { getOrg } from './get-org.controller'

export async function orgsRoutes(app: FastifyInstance) {
  // app.get('/orgs/search', search)
  app.get('/orgs/:orgId', getOrg)
  app.post('/orgs', create)
  // app.post('/orgs/authenticate', authenticate)
}
