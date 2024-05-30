import {useState} from "react";
import TUser from "../types/TUser"
import AuthService from "../services/AuthService";
import exp from "node:constants";


function useProfile() {
    const [user, setUser] = useState<TUser | null>(null)

    async function loginUser(login: string, password: string) {
        try {
            const response = await AuthService.login_user(login, password);
            localStorage.setItem('token', response.data.token);
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

    function changeStatus() {
        try {
            AuthService.change_status();
        } catch (e) {
            console.log(e)
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

    async function changeUser(name: string, surname: string, city: string, age: string, email: string, gender: string, role: string, experience: string, level: string) {
        try {
            AuthService.change_user(name, surname, city, age, email, gender, role, experience, level).then(response => {
                setUser(response.data)
            })
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
        changeUser,
        changeStatus
    }
}

export default useProfile;
