import {AxiosResponse} from "axios";
import $api from "../http";
import TUser from "../types/TUser";

function getUsers (numberPage: number):Promise<AxiosResponse<TUser[]>> {
    return $api.get(`/users?page=${numberPage}`)
}

export default getUsers