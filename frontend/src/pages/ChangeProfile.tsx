import React, {useContext, useState} from "react";
import {ProfileContext} from "../App";
import {useNavigate} from "react-router-dom";


const ChangeProfile = () => {

    const profile = useContext(ProfileContext)
    const navigate = useNavigate()

    const [login, setLogin] = useState(profile?.user?.login);
    const [name, setName] = useState(profile?.user?.name);
    const [surname, setSurname] = useState(profile?.user?.surname);
    const [city, setCity] = useState(profile?.user?.city);
    const [role, setRole] = useState(profile?.user?.UserRoles.role);
    const [experience, setExperience] = useState(profile?.user?.UserRoles.experience);
    const [level, setLevel] = useState(profile?.user?.UserRoles.level);
    const [age, setAge] = useState(String(profile?.user?.age));


    return (
        <div>
            <h1 style={{marginBottom: 20, marginTop: 20}}>Изменить профиль пользователя {profile?.user?.login}</h1>
            <form>
                <div className="form-group">
                    <label>Логин пользователя</label>
                    <input type="text" className="form-control" placeholder={profile?.user?.login} required
                           onChange={e => setLogin(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Имя</label>
                    <input type="text" className="form-control" placeholder={profile?.user?.name} required
                           onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label form="floatingInput">Фамилия</label>
                    <input type="text" className="form-control" placeholder={profile?.user?.surname} required
                           onChange={e => setSurname(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label form="floatingInput">Город</label>
                    <input type="text" className="form-control" placeholder={profile?.user?.city} required
                           onChange={e => setCity(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label form="floatingInput">Инструмент</label>
                    <input type="text" className="form-control" placeholder={profile?.user?.UserRoles.role} required
                           onChange={e => setRole(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label form="floatingInput">Опыт</label>
                    <input type="text" className="form-control" placeholder={profile?.user?.UserRoles.experience}
                           required
                           onChange={e => setExperience(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label form="floatingInput">Уровень владения</label>
                    <input type="text" className="form-control" placeholder={profile?.user?.UserRoles.level} required
                           onChange={e => setLevel(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label form="floatingInput">Возраст</label>
                    <input type="text" className="form-control" placeholder={String(profile?.user?.age)} required
                           onChange={e => setAge(e.target.value)}
                    />
                </div>
                <button className="btn btn-danger w-50 py-2" type="submit"
                        onClick={(e) => {
                            navigate('/profile')
                        }}
                >Отмена
                </button>
                <button className="btn btn-primary w-50 py-2" type="submit"
                        // onClick={(e) => {
                        //     e.preventDefault();
                        //     profile?.changeUser(login, name, surname, city, role, experience, level, age).then(() => {
                        //         navigate('/profile')
                        //     })
                        // }}
                >Регистрация
                </button>
            </form>
        </div>
    )
}

export default ChangeProfile