import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs.repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgsRepository implements OrgsRepository {

  async create(data: Prisma.OrgUncheckedCreateInput) {
    const org = await prisma.org.create({ data })
    return org
  }

  /*async searchMany(query: string, page: number) {
    const orgs = await prisma.org.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return orgs
  }*/

  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: { id },
    })
    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })
    return org
  }

}
