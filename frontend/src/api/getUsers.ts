import {AxiosResponse} from "axios";
import $api from "../http";
import TUser from "../types/TUser";

function getUsers (numberPage: number, filtersString: string):Promise<AxiosResponse<TUser[]>> {
    console.log(`/users?page=${numberPage}${filtersString}`)
    return $api.get(`/users?page=${numberPage}${filtersString}`)
}

export default getUsers