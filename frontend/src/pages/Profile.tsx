import React, { useContext } from "react";
import {ProfileContext} from "../App";
import {Image} from "react-bootstrap";
import logo from "../images/empty_profile.jpg"
import {useNavigate} from "react-router-dom";


const Profile = () => {

    const profile = useContext(ProfileContext)
    console.log(profile?.user)
    const navigate = useNavigate()

    return (
        <div className="container">
            <h1 style={{marginBottom: 20, marginTop: 20}}>Профиль пользователя {profile?.user?.login}</h1>
            <div className="row">
                <div className="col-4">
                    <Image src={logo} fluid thumbnail style={{marginBottom: 15}}/>
                    <div className="d-grid gap-3">
                        <button type="button" className="btn btn-primary btn-lg" onClick={() => {
                            navigate('/changeProfile')
                        }}
                        >Изменить</button>
                        <button type="button" className="btn btn-primary btn-lg" onClick={() => {
                            profile?.logoutUser()
                            navigate('/login')
                        }}>Выйти
                        </button>
                        <button type="button" className="btn btn-secondary btn-lg">Вывести профиль</button>
                        <button type="button" className="btn btn-danger btn-lg">Удалить аккаунт</button>
                    </div>
                </div>
                <div className="col-8">
                <table className='table'>
                    <tbody>
                    <tr>
                        <th scope="row">Login</th>
                        <td>{profile?.user?.login}</td>
                    </tr>
                    <tr>
                        <th scope="row">Имя</th>
                        <td>{profile?.user?.name}</td>
                    </tr>
                    <tr>
                        <th scope="row">Фамилия</th>
                        <td>{profile?.user?.surname}</td>
                    </tr>
                    <tr>
                        <th scope="row">Город</th>
                        <td>{profile?.user?.city}</td>
                    </tr>
                    <tr>
                        <th scope="row">Инструмет</th>
                        <td>{profile?.user?.UserRoles.role}</td>
                    </tr>
                    <tr>
                        <th scope="row">Опыт</th>
                        <td>{profile?.user?.UserRoles.experience}</td>
                    </tr>
                    <tr>
                        <th scope="row">Уровень владения</th>
                        <td>{profile?.user?.UserRoles.level}</td>
                    </tr>
                    <tr>
                        <th scope="row">Возраст</th>
                        <td>{profile?.user?.age}</td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}

export default Profile;