import React, {useContext} from "react";
import {ProfileContext} from "../App";
import {useNavigate} from "react-router-dom";
import useChangeProfile from "../hooks/useChangeProfile";


const ChangeProfile = () => {

    const profile = useContext(ProfileContext)
    const navigate = useNavigate()
    const {setEmail, setName,
        setAge, setCity,
        setSurname, setGender,
        email, name, surname, city,
        age, gender} = useChangeProfile(profile)

    return (
        <div>
            <h1 style={{marginBottom: 20, marginTop: 20}}>Изменить профиль пользователя {profile?.user?.login}</h1>
            <form>
                <div className="form-group">
                    <label>Почта пользователя</label>
                    <input type="text" className="form-control" value={email ? email : ''} required
                           onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Имя</label>
                    <input type="text" className="form-control" value={name ? name : ''} required
                           onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label form="floatingInput">Фамилия</label>
                    <input type="text" className="form-control" value={surname ? surname : ''} required
                           onChange={e => setSurname(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label form="floatingInput">Город</label>
                    <input type="text" className="form-control" value={city ? city : ''} required
                           onChange={e => setCity(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label form="floatingInput">Возраст</label>
                    <input type="text" className="form-control" value={age ? age : ''} required
                           onChange={e => setAge(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label form="floatingInput">Пол</label>
                    <input type="text" className="form-control" value={gender ? gender : ''} required
                           onChange={e => setGender(e.target.value)}
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
                            if (profile && profile.user && name && surname && city && age && email && gender) {
                                profile.changeUser(name, surname, city, age, email, gender).then(() => {
                                    navigate('/profile')
                                })
                            }
                        }}
                >Регистрация
                </button>
            </form>
        </div>
    )
}

export default ChangeProfile