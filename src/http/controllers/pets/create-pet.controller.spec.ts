// @vitest-environment prisma
import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Create PET (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {

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
  })
})
