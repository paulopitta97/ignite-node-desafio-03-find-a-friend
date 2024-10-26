import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { getDefaultOrgData } from '@/utils/test/get-default-org-data'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    let data = await getDefaultOrgData();
    data = { ...data, password: data.clear_password };

    const responseCreate = await request(app.server)
      .post('/orgs')
      .send(data)
    expect(responseCreate.statusCode).toEqual(201)

    const responseAuthenticate = await request(app.server).post('/orgs/authenticate').send({
      email: data.email,
      password: data.clear_password,
    })

    expect(responseAuthenticate.statusCode).toEqual(200)
    expect(responseAuthenticate.body).toEqual({ token: expect.any(String) })
  })
})
