import { prisma } from "../utils/prisma"

export const userService = {
    async getAll() {
        return await prisma.user.findMany()
    },
    async find(id: number) {
        return prisma.user.findUnique({
            where: {id}
        })
    },
    async search(username: string) {
        return prisma.user.findMany({
            where: {
                username: {
                    contains: username
                }
            }
        })
    },
    async create(body: {fullname: string, username: string, bio?: string, phone: string}) {
        const existed = await prisma.user.findUnique({
            where: {username: body.username}
        })
        if(existed) {
            throw new Error('username already exists')
        }
        
        return await prisma.user.create({
            data: body
        })
    },
    async update(body: {fullname: string, username: string, phone: string}, id: number) {
        const user = await prisma.user.findUnique({
            where: {id}
        })
        if(!user) {
            throw new Error('user not found')
        }
        
        return await prisma.user.update({
            where: {id},
            data: body
        })
    },
    async delete(id: number) {
        const user = await prisma.user.findUnique({
            where: {id}
        })
        if(!user) {
            throw new Error('user not found')
        }

        return prisma.user.delete({
            where: {id}
        })
        return {
            message: 'successfully'
        }
    }
}