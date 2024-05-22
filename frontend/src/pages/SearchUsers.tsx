import React, {useEffect, useState} from "react";
import getUsers from "../api/getUsers";
import TUser from "../types/TUser";
import UserCard from "../components/UserCard";
import params from "../components/Params";
import Params from "../components/Params";

const SearchUsers = () => {
    const [users, setUsers] = useState<TUser[]>([])
    const [pages, setPages] = useState<number>(1)
    const [filtersString, setFiltersString] = useState('')
    useEffect(() => {
        getUsers(pages, filtersString).then(response => {
            setUsers(response.data)
        })
    }, [pages, filtersString]);
    const usersCards = users.map((user, index) => {
        return <UserCard name={user.name} surname={user.surname} city={user.city} gender={user.gender}
                         email={user.email} experience={user.userRole.experience}
                         role={user.userRole.role} level={user.userRole.level} age={user.age} key={index}/>
    })

    return (
        <div className='row g-0 text-center'>
            <div className='col-6 col-md-4'>
                <h1>Параметры</h1>
                <Params setFiltersString={setFiltersString}/>
            </div>
            <div className='col-sm-6 col-md-8'>
                <h1>Карточки</h1>
                <div className='container-fluid' style={{paddingRight: 40, paddingLeft: 40}}>
                    {usersCards}
                    <button onClick={() => {
                        if (pages === -1) {
                            setPages(3)
                        } else {
                            setPages(pages-1)
                        }
                        console.log(pages)
                    }}>
                        <span className="visually">Предыдущая</span>
                    </button>
                    <button onClick={() => {
                        if (pages === 3) {
                            setPages(1)
                        } else {
                            setPages(pages+1)
                        }
                        console.log(pages)
                    }}>
                        <span className="visually">Следующая</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SearchUsers;