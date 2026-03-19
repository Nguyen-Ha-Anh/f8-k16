import { prisma } from "../utils/prisma"

export const productService = {
    async getAll() {
        return await prisma.product.findMany()
    },
    async find(id: number) {
        const product = await prisma.product.findUnique({
            where: {id},
            include: {
                productAttributeValues: {
                    include: {
                        attributeValue: {
                            include: {
                                attribute: true
                            }
                        }
                    }
                }
            }
        })
        return product
    },
    async create(body: {name: string, description?: string, price: number, stock: number}) {
        return await prisma.product.create({
            data: body
        })
    },
    async update(id: number, body: {name: string, description?: string, price: number, stock: number}) {
        return await prisma.product.update({
            where: {id},
            data: body
        })
    },
    async delete(id: number) {
        const product = await prisma.product.findUnique({
            where: {id}
        })
        if(!product) {
            throw new Error('product not found')
        }

        await prisma.product.delete({
            where: {id}
        })
        return {
            message: 'product delete successfully'
        }
    }
}