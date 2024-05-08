import React, {useState} from "react";
type UserCardProps = {
    name: string,
    surname: string,
    city: string,
    gender: string,
    email: string,
}
const UserCard: React.FC<UserCardProps> = props =>  {
    const [isActive, setIsActive] = useState(false)
    let elementsDisplay = isActive ? "table-row" : "none"
    return (
        <div className="card" style={{marginBottom: 20}}>
            <h5 className="card-header">Ищу музыкальную группу</h5>
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <table className="table">
                    <tbody>
                    <tr>
                        <th scope="row">Город</th>
                        <td>{props.city}</td>
                    </tr>
                    <tr>
                        <th scope="row">Пол</th>
                        <td>{props.gender}</td>
                    </tr>

                    <tr style={{display: elementsDisplay}}>
                        <th scope="row">Фамилия</th>
                        <td>{props.surname}</td>
                    </tr>
                    <tr style={{display: elementsDisplay}}>
                        <th scope="row">Почта</th>
                        <td>{props.email}</td>
                    </tr>
                    </tbody>
                </table>
                <button className="btn btn-primary" onClick={() => {
                    setIsActive(!isActive)
                }}>{isActive ? 'Скрыть' : 'Узнать подробнее'}</button>
            </div>
        </div>
    )
}

export default UserCard