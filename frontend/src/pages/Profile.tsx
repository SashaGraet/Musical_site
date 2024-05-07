import React, { useContext, useEffect, useState } from "react";
import {ProfileContext} from "../App";
import {Image} from "react-bootstrap";
import logo from "../images/empty_profile.jpg"

const Profile = () => {

    const profile = useContext(ProfileContext)
    console.log(profile?.user)

    return (
        <div className="container">
            <h1 style={{marginBottom: 20, marginTop: 20}}>Профиль пользователя {profile?.user?.login}</h1>
            <div className="row">
                <div className="col-4">
                    <Image src={logo} fluid thumbnail style={{marginBottom: 15}}/>
                    <div className="d-grid gap-3">
                    <button type="button" className="btn btn-primary btn-lg">Изменить</button>
                    <button type="button" className="btn btn-primary btn-lg">Выйти</button>
                    <button type="button" className="btn btn-secondary btn-lg">Удалить аккаунт</button>
                    </div>
                </div>
                <div className="col-8">
                    <table className='table'>
                        <tbody>
                        <tr>
                            <th scope="row">Имя</th>
                            <td>...</td>
                        </tr>
                        <tr>
                            <th scope="row">Фамилия</th>
                            <td>...</td>
                        </tr>
                        <tr>
                            <th scope="row">Город</th>
                            <td>...</td>
                        </tr>
                        <tr>
                            <th scope="row">Инструмет</th>
                            <td>...</td>
                        </tr>
                        <tr>
                            <th scope="row">Опыт</th>
                            <td>...</td>
                        </tr>
                        <tr>
                            <th scope="row">Возраст</th>
                            <td>...</td>
                        </tr>
                        </tbody>
                    </table>
                    <h3>Мои объявления</h3>
                    <div className="border solid border-black container-fluid">
                        <table className='table borderless size="sm"'>
                            <h4>Ищу группу</h4>
                            <tr>
                                <th scope="row">Имя</th>
                                <td>...</td>
                            </tr>
                            <tr>
                                <th scope="row">Фамилия</th>
                                <td>...</td>
                            </tr>
                            <tr>
                                <th scope="row">Город</th>
                                <td>...</td>
                            </tr>
                            <tr>
                                <th scope="row">Инструмент</th>
                                <td>...</td>
                            </tr>
                        </table>
                    </div>
                    <h3>Мои музыкальные группы</h3>
                    <div>
                        <h4>Не найдено</h4>
                    </div>
                </div>
            </div>
        </div>
)
}

export default Profile;