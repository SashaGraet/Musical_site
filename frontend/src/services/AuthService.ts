import $api from "../http";
import { AxiosResponse } from "axios";
import TUser from "../types/TUser";

export default class AuthService {
    static async login_user(login: string, password: string): Promise<AxiosResponse<{user: Omit<TUser, "password">}& {accessToken: string}>> {
        return $api.post('/login', {login, password})
    }

    static async register_user(email: string, login: string, password: string): Promise<AxiosResponse<{user: Omit<TUser, "password">}& {accessToken: string}>> {
        return $api.post('/register', {email, login, password})
    }

    static async logout(): Promise<void> {
        return $api.post('/logout')
    }
}