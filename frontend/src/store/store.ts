import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";

export default class Store {
    user = {} as IUser;
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    async login_user(login: string, password: string) {
        try {
            const response = await AuthService.login_user(login, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e);
        }
    }

    async register_user(email: string, login: string, password: string) {
        try {
            const response = await AuthService.register_user(email,login, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e);
        }
    }

    async logaut() {
        try {
            const response = await AuthService.logaut;
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e) {
            console.log(e);
        }
    }

    // async checkAuth() {
    //     try {
    //         const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
    //         console.log(response);
    //         localStorage.removeItem('token');
    //         this.setAuth(true);
    //         this.setUser(response.data.user);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
}