import {useState} from "react";
import TUser from "../types/TUser"
import AuthService from "../services/AuthService";


function useProfile() {
    const [user, setUser] = useState<Omit<TUser, "password"> | null>(null)

    async function loginUser(login: string, password: string) {
        try {
            const response = await AuthService.login_user(login, password);
            localStorage.setItem('token', response.data.accessToken);
            setUser(response.data.user);
        } catch (e) {
            console.log(e);
        }
    }

    async function registrationUser(email: string, login: string, password: string) {
        try {
            const response = await AuthService.register_user(email,login, password);
            localStorage.setItem('token', response.data.accessToken);
            setUser(response.data.user);
        } catch (e) {
            console.log(e);
        }
    }

    function logout() {
        try {
            localStorage.removeItem('token');
            setUser(null);
        } catch (e) {
            console.log(e);
        }
    }

    return {
        loginUser,
        registrationUser,
        logout,
        user,
        setUser
    }
}

export default useProfile;
