import axios from "axios"

const BASE_URL = 'https://instagram.f8team.dev'

export const forgotPassword = (email: string) => {
    return axios.post(`${BASE_URL}/api/auth/forgot-password`, {
        email
    }).then(res => res.data)
}