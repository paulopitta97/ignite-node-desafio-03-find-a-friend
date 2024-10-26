import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { getDefaultOrgData } from '@/utils/test/get-default-org-data'

describe('GET ORG (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a org', async () => {

    let data = await getDefaultOrgData();
    data = { ...data, password: data.clear_password };

    const response = await request(app.server)
      .post('/orgs')
      .send(data)

    expect(response.statusCode).toEqual(201)

    let orgId = response.body.id;

    const getOrgResponse = await request(app.server)
      .get(`/orgs/${orgId}`)
      .send()

      console.log( getOrgResponse.body )
    expect(getOrgResponse.statusCode).toEqual(200)
    expect(getOrgResponse.body).toHaveProperty('email', data.email);
  })
})
