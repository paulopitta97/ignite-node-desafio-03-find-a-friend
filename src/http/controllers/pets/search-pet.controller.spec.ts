import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { getDefaultOrgData } from '@/utils/test/get-default-org-data'

describe('SEARCH PET (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by city', async () => {

    const { token } = await createAndAuthenticateOrg( app )

    let petData = {
      name: 'Doguinho 1',
      about: 'Sobre o cachorro Doguinho 1',
      age: "2",
      category: "DOG",
    };

    const response = await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(petData)

    expect(response.statusCode).toEqual(201)
    expect(response.body).toHaveProperty('id'); // Verifica se o ID da organização foi retornado
    expect(response.body).toHaveProperty('name', petData.name); // Verifica se o nome está correto

    let orgData = await getDefaultOrgData();
    const searchPetsResponse = await request(app.server)
      .get(`/orgs/pets`)
      .query({ city: orgData.city })

    expect(searchPetsResponse.statusCode).toEqual(200)
    expect(searchPetsResponse.body).toHaveLength(1)
  })

  it('should not be able to search pets without city', async () => {
    const response = await request(app.server).get('/orgs/pets')
    expect(response.status).toBe(400)
  })
})
