// @vitest-environment prisma
import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { getDefaultOrgData } from '@/utils/test/get-default-org-data'

describe('Create ORG (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a org', async () => {

    let data = await getDefaultOrgData();
    data = { ...data, password: data.clear_password };

    // console.log( data )

    const response = await request(app.server)
      .post('/orgs')
      .send(data)

    // console.log( response.body )

    expect(response.statusCode).toEqual(201)
    expect(response.body).toHaveProperty('id'); // Verifica se o ID da organização foi retornado
    expect(response.body).toHaveProperty('name', data.name); // Verifica se o nome está correto
  })
})
