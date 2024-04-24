import React, { useEffect, useState } from "react";

const Profile = () => {

    const [login, setName] = useState('');


    useEffect(() => {
        (
            async () => {
                const responce = await fetch('http://localhost:8000/api/user', {
                    mode: 'no-cors',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });
                console.log(responce)

                const content = await responce.json();
                console.log(content)

                console.log(content.login)
            }
        )();
    });

    return (
        <div>
            {login ? 'Hi ' + login: 'Ypu lose'}
        </div>
    )
}

export default Profile;