import axios, { Axios, AxiosError } from "axios";
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


const handleRequest = async <T>(request:Promise<any>):Promise<T> => {
    try {
        const response = await request
        return response.data
    } catch (error:any) {
        return error?.response?.data || { success: false, message: "Unexpected error" }
    }
}


export const login = (user: ILoginData): Promise<IResponse> => {
    return handleRequest(api.post("auth/login", user))
}

export const getAllUsers = (): Promise<IResponse> => {
    return  handleRequest(api.get("user/all"))
}
export const inviteUser = (email: string): Promise<IResponse> => {
    return handleRequest(api.post("user/invite", { email }))
}

export const verifyToken = (token: string): Promise<IResponse> => {
    return handleRequest(api.post("auth/token/verify", { token }))
}

export const activateUser = (user: FormData, _id: string | number): Promise<IResponse> => {
    return handleRequest(api.post("user/activate", user, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }))
}

export const sendResetMail = (email: string): Promise<IResponse> => {
    return handleRequest(api.post("user/reset/password", { email }))
}

export const changePassword = (newPassword: string, userId: string | number): Promise<IResponse> => {
    return handleRequest(api.post("user/change/password", { newPassword, userId }))
}

export const deleteUser = (userId: string): Promise<IResponse> => {
    return handleRequest(api.delete(`user/delete/${userId}`))
}

export const updateUser = (userId: string, data: any): Promise<IResponse> => {
    return handleRequest(api.patch(`user/update/${userId}`, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }))
}

