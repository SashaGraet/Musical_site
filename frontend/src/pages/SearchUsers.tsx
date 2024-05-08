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
        return <UserCard name={user.name} surname={user.surname} city={user.city} gender={user.gender} email={user.email} key={index}/>
    })

    return (
        <div className='row g-0 text-center'>
            <div className='col-6 col-md-4'>
                <h1>Параметры</h1>
                <div style={{border: "solid black", borderRadius: 15, height: "auto"}}>
                    <div className="dropdown" id='city'>
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                                data-bs-toggle="dropdown" aria-expanded="false">
                            Город
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a className="dropdown-item" href="#">Красноярск</a></li>
                            <li><a className="dropdown-item" href="#">Москва</a></li>
                            <li><a className="dropdown-item" href="#">Санкт Петербург</a></li>
                        </ul>
                    </div>
                    <div className="btn-group" id='age'>
                        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                            Возраст
                        </button>
                        <div className="dropdown-menu">
                            <div className="form-check dropdown-item">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    18 - 20
                                </label>
                            </div>
                            <div className="form-check dropdown-item">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    20 - 25
                                </label>
                            </div>
                            <div className="form-check dropdown-item">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    больше 25
                                </label>
                            </div>
                        </div>
                    </div>
                    <div id='role'>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                Default checkbox
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                Default checkbox
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                Default checkbox
                            </label>
                        </div>
                    </div>
                    <div id='Exp'></div>
                </div>
            </div>
            <div className='col-sm-6 col-md-8'>
                <h1>Каточки</h1>
                <div className='container-fluid' style={{paddingRight: 40, paddingLeft: 40}}>
                    {usersCards}
                </div>
            </div>
        </div>
    )
}

export default SearchUsers;