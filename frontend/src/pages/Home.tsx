import React, { useEffect, useState } from "react";

const Home = () => {

    const [name, setName] = useState('');

    useEffect(() => {
        (
            async () => {
                const responce= await fetch('http://localhost:8000/api/user', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });

                const content = await Response.json;

                setName(content.name)
            }   
        )();
    });

    return (
        <div>
            Home {name}
        </div>
    )
}

export default Home;