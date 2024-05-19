import React, {useEffect, useState} from "react";
import getUsers from "../api/getUsers";
import TUser from "../types/TUser";
import UserCard from "../components/UserCard";

const SearchUsers = () => {
    const [users, setUsers] = useState<TUser[]>([])
    useEffect(() => {
        getUsers(1).then(response => {
            setUsers(response.data)
        })
    }, []);
    const usersCards = users.map((user, index) => {
        return <UserCard name={user.name} surname={user.surname} city={user.city} gender={user.gender}
                         email={user.email} experience={user.UserRoles.experience}
                         role={user.UserRoles.role} level={user.UserRoles.level} key={index}/>
    })

    return (
        <div className='row g-0 text-center'>
            <div className='col-6 col-md-4'>
                <h1>Параметры</h1>
            </div>
            <div className='col-sm-6 col-md-8'>
                <h1>Карточки</h1>
                <div className='container-fluid' style={{paddingRight: 40, paddingLeft: 40}}>
                    {usersCards}
                </div>
            </div>
        </div>
    )
}

export default SearchUsers;