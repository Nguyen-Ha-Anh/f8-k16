import { User } from "../types/user.type"

//khai bao 1 cai mang de luu tat ca cac user dang ky
const users: User[] = []

export const authService = {
    //ham register nhan vao 1 user 
    register: (user: User) => {
        //check ton tai 
        const exists = users.find(user => user.email === user.email)
        if (exists) {
            throw new Error('email already exists')
        } 

        //luu user day du
        users.push(user)

        //user chua ton tai --> tao moi
        const newUser = {
            email: user.email,
            fullName: user.fullName
        }

        //tra ve user khong co password
        return newUser
    },

    login: (data: {email: string, password: string}) => {
        //tim user theo email
        const user = users.find(user => user.email === data.email)

        if (!user) {
            throw new Error('user not found')
        }

        if (user.password !== data.password) {
            throw new Error ('invalid password')
        }

        //tra ve user khong pass 
        const successLogin = {
            email: user.email,
            fullName: user.fullName
        }
        return successLogin
    }
}