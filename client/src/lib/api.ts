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
    const response = await api.get("user/all")
    return response.data
}

export const inviteUser = async (email: string): Promise<IResponse> => {
    const response = await api.post("user/invite", { email })
    return response.data
}

export const verifyInvitationToken = async (token:string): Promise<IResponse> => {
    const response = await api.post("user/invite/verify", { token })
    return response.data
}

export const activateUser = async (user:IUser, _id:string | number): Promise<IResponse> => {
    const response = await api.post("user/activate", { user, _id })
    return response.data
}