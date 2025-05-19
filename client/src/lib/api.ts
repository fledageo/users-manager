import axios from "axios";
import type { ILoginData, IResponse, IUser } from "./types";

const api = axios.create({
    baseURL: "http://localhost:5000/api"
})

api.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, function (error) {
    console.log(error)
    return Promise.reject(error);
});


export const login = async (user: ILoginData): Promise<IResponse> => {
    const response = await api.post("auth/login", user)
    return response.data
}

export const getAllUsers = async (): Promise<IResponse> => {
    try {
        const response = await api.get("user/all")
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}

export const inviteUser = async (email: string): Promise<IResponse> => {
    const response = await api.post("user/invite", { email })
    return response.data
}

export const verifyToken = async (token: string): Promise<IResponse> => {
    try {
        const response = await api.post("auth/token/verify", { token })
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}

export const activateUser = async (user: IUser, _id: string | number): Promise<IResponse> => {
    const response = await api.post("user/activate", { user, _id })
    return response.data
}

export const sendResetMail = async (email: string): Promise<IResponse> => {
    const response = await api.post("user/reset/password", { email })
    return response.data
}

export const changePassword = async (newPassword: string, userId: string | number): Promise<IResponse> => {
    const response = await api.post("user/change/password", { newPassword, userId })
    return response.data
}

export const deleteUser = async (userId: string): Promise<IResponse> => {
    try {
        const response = await api.delete(`user/delete/${userId}`)
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}   

export const updateUser = async (userId:string, data:any): Promise<IResponse> => {
    try {
        const response = await api.patch(`user/update/${userId}`, data)
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}   

