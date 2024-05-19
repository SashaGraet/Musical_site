import {useState} from "react";
import TUser from "../types/TUser"
import AuthService from "../services/AuthService";


function useProfile() {
    const [user, setUser] = useState<TUser | null>(null)

    async function loginUser(login: string, password: string) {
        try {
            const response = await AuthService.login_user(login, password);
            localStorage.setItem('token', response.data.accessToken);
        } catch (e) {
            console.log(e);
        }
    }

    async function registrationUser(email: string, login: string, password: string) {
        try {
            await AuthService.register_user(email,login, password);
        } catch (e) {
            console.log(e);
        }
    }

    function logoutUser() {
        try {
            localStorage.removeItem('token');
            setUser(null);
        } catch (e) {
            console.log(e);
        }
    }

    async function infoUser() {
        try {
            const response = await AuthService.info_user();
            setUser(response.data)
        } catch (e) {
            console.log(e);
        }
    }

    async function changeUser(login: string, name: string, surname: string, city: string, role: string, experience: string, level: string, age: string) {
        try {
            await AuthService.change_user(login, name, surname, city, role, experience, level, age)
        } catch (e) {
            console.log(e)
        }
    }


    return {
        loginUser,
        registrationUser,
        logoutUser,
        infoUser,
        user,
        setUser,
        changeUser
    }
}

export default useProfile;
