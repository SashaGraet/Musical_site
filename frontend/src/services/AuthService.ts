import $api from "../http";
import axios, { AxiosResponse } from "axios";
import TUser from "../types/TUser";

export default class AuthService {
    static async login_user(login: string, password: string): Promise<AxiosResponse<{user: TUser}& {accessToken: string}>> {
        return $api.post('/login', {login, password})
    }

    static async register_user(email: string, login: string, password: string): Promise<AxiosResponse<{user: TUser}>> {
        return $api.post('/register', {email, login, password})
    }

    static async logout(): Promise<void> {
        return $api.post('/logout')
    }

    static async info_user(): Promise<AxiosResponse<TUser>> {
        return $api.get('/user', )
    }

    static async change_user(login: string, name: string, surname: string, city: string, role: string, experience: string, level: string, age: string): Promise<AxiosResponse<{user: TUser}>> {
        return $api.post('/editprofile', {login, name, surname, city, role, experience, level, age})
    }
}