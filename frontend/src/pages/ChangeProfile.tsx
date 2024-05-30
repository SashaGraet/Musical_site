import React, {useContext} from "react";
import {ProfileContext} from "../App";
import {useNavigate} from "react-router-dom";
import useChangeProfile from "../hooks/useChangeProfile";
import Dropdown from 'react-bootstrap/Dropdown';

const ChangeProfile = () => {

    const profile = useContext(ProfileContext)
    const navigate = useNavigate()
    const {setEmail, setName,
        setAge, setCity,
        setSurname, setGender,
        setRole, setExp, setLevel,
        email, name, surname, city,
        age, gender, role, experience, level} = useChangeProfile(profile)

    return (
        <div className='container' style={{borderStyle: "solid", borderColor: 'lightgrey', marginTop: '30px',
            paddingBottom: '40px', borderRadius: '15px'}}>
            <h1 style={{marginBottom: 20, marginTop: 20}}>Изменить профиль пользователя {profile?.user?.login}</h1>
            <form>
                <div className="form-group elem">
                    <h4>Почта пользователя</h4>
                    <input type="text" className="form-control" value={email ? email : ''} required
                           onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group elem">
                    <h4>Имя</h4>
                    <input type="text" className="form-control" value={name ? name : ''} required
                           onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="form-group elem">
                    <h4>Фамилия</h4>
                    <input type="text" className="form-control" value={surname ? surname : ''} required
                           onChange={e => setSurname(e.target.value)}
                    />
                </div>
                <div className="form-group elem">
                    <h4>Город</h4>
                    <select className="form-control" onChange={e => setCity(e.target.value)}>
                        <option value={city}>Город пользователя {city}</option>
                        <option value='Красноярск'>Красноярск</option>
                        <option value='Челябинск'>Челябинск</option>
                        <option value='Москва'>Москва</option>
                        <option value='Казань'>Казань</option>
                        <option value='Екатеренбург'>Екатеренбург</option>
                        <option value='Рязань'>Рязань</option>
                        <option value='Поронайск'>Поронайск</option>
                        <option value='Самара'>Самара</option>
                        <option value='Рязань'>Рязань</option>
                    </select>
                </div>
                <div className="form-group elem">
                    <h4>Возраст</h4>
                    <input type="text" className="form-control" value={age ? age : ''} required
                           onChange={e => setAge(e.target.value)}
                    />
                </div>
                <div className="form-group elem">
                    <h4>Пол</h4>
                    <select className="form-control" onChange={e => setGender(e.target.value)}>
                        <option value={gender}>Пол пользователя {gender}</option>
                        <option value='Мужской'>Мужской</option>
                        <option value='Женский'>Жеснкий</option>
                    </select>
                </div>
                <div className="form-group elem">
                    <h4>Инструмент</h4>
                    <select className="form-control" onChange={e => setRole(e.target.value)}>
                        <option value={role}>Инструмент пользователя {role}</option>
                        <option value='Певец'>Певец</option>
                        <option value='Барабанщик'>Барабанщик</option>
                        <option value='Гитарист'>Гитарист</option>
                    </select>
                </div>
                <div className="form-group elem">
                    <h4>Уровень</h4>
                    <select className="form-control" onChange={e => setExp(e.target.value)}>
                        <option value={experience}>Уровень пользователя {experience}</option>
                        <option value='Начинающий'>Начинающий</option>
                        <option value='Опытный'>Опытный</option>
                        <option value='Продвинутый'>Продвинутый</option>
                    </select>
                </div>
                <div className="form-group elem" style={{paddingBottom: '20px'}}>
                    <h4>Опыт</h4>
                    <input type="text" className="form-control" value={level ? level : ''} required
                           onChange={e => setLevel(e.target.value)}
                    />
                </div>
                <button className="btn btn-danger w-50 py-2" type="submit"
                        onClick={(e) => {
                            navigate('/profile')
                        }}
                >Отмена
                </button>
                <button className="btn btn-primary w-50 py-2" type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            if (profile && name && surname && city && age && email && gender) {
                                if (role && experience && level) {
                                    profile.changeUser(name, surname, city, age, email, gender, role, experience, level)
                                    navigate('/profile')
                                } else {
                                    profile.changeUser(name, surname, city, age, email, gender, '', '', '')
                                    navigate('/profile')
                                }
                            }
                        }}
                >Сохранить
                </button>
            </form>
        </div>
    )
}

export default ChangeProfile