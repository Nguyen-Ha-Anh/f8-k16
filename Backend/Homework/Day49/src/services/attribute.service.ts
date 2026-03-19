import { prisma } from "../utils/prisma"

export const attributeService = {
    async getAll() {
        return await prisma.attribute.findMany()
    },
    async find(id: number) {
        return await prisma.attribute.findUnique({
            where: {id},
            include: {
                attributeValue: true
            }
        })
    },
    async create(body: {name: string}) {
        return await prisma.attribute.create({
            data: {name: body.name}
        })
    },
    async update(id: number, name: string) {
        return await prisma.attribute.update({
            where: {id},
            data: {name}
        })
    },
    async delete(id: number) {
        const data = await prisma.attribute.findUnique({
            where: {id}
        })
        if(!data) {
            throw new Error('attribute not found')
        }

        await prisma.attribute.delete({
            where: {id}
        })
        return {
            message: 'attribute delete successfully'
        }
    },
    async createValue(attributeId: number, value: string) {
        return await prisma.attributeValue.create({
            data: {
                attributeId, 
                value
            }
        })
    },
    async deleteValue(valueId: number) {
        return await prisma.attributeValue.delete({
            where: {id: valueId}
        })
    }
}