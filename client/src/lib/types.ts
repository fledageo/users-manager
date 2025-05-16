export interface IUser {
    _id?: string | number
    email?: string
    status?: string
    password?: string,
    phone?: string,
    fullName?: string
    photo?: string
}

export interface ILoginData {
    email: string
    password: string
}

export interface IResponse {
    status: "ok" | "error"
    message?: string
    payload?: any
}