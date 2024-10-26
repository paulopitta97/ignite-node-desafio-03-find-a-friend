import { FastifyInstance } from 'fastify'
import request from 'supertest'
import { getDefaultOrgData } from './get-default-org-data';

export async function createAndAuthenticateOrg( app: FastifyInstance ) {
  let data = await getDefaultOrgData();
  data = { ...data, password: data.clear_password };

  const orgCreateResponse = await request(app.server)
    .post('/orgs')
    .send(data)

  const authResponse = await request(app.server)
    .post('/orgs/authenticate').send({
      email: data.email,
      password: data.clear_password,
    })

  const { token } = authResponse.body

  return { token }
}
