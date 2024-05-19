import $api from "../http";
import axios, { AxiosResponse } from "axios";
import TUser from "../types/TUser";

export default class AuthService {
    static async login_user(login: string, password: string): Promise<AxiosResponse<{user: TUser}& {token: string}>> {
        return $api.post('/login', {login, password})
    }

    static async register_user(email: string, login: string, password: string): Promise<AxiosResponse<{user: TUser}>> {
        return $api.post('/register', {email, login, password})
    }

    static async logout(): Promise<void> {
        return $api.post('/logout')
    }

    static async info_user(): Promise<AxiosResponse<TUser>> {
        return $api.post('/user', {token: localStorage.getItem('token')})
    }

    static async change_user(name: string, surname: string, city: string, age: string, email: string, gender: string): Promise<AxiosResponse<TUser>> {
        return $api.post('/editprofile', {name, surname, city, age:age.toString(), email, gender, token: localStorage.getItem('token')})
    }
}