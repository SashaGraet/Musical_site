import React, {SyntheticEvent, useState} from "react";
import { Navigate, redirect, useLocation } from "react-router-dom";

const Login = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [my_redirect, setMyRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch('http://localhost:8000/api/login', {
            mode: 'no-cors',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                login,
                password
            })

        });

        setMyRedirect(true)
    }

    if (my_redirect) {
        return <Navigate to='/profile' />
    }

    return (
        <form onSubmit={submit} className="form-signin w-100 m-auto">
          <h1 className="h3 mb-3 fw-normal">Вход в профиль</h1>

          <div className="form-floating">
            <input type="login" className="form-control" placeholder="Login" required
                onChange={e => setLogin(e.target.value)}
            />
            <label form="floatingInput">Login</label>
          </div>

          <div className="form-floating">
            <input type="password" className="form-control" placeholder="Password" required
                onChange={e => setPassword(e.target.value)}
            />
            <label form="floatingInput">Password</label>
          </div>

          <button className="btn btn-primary w-100 py-2" type="submit">Войти</button>
        </form>
    );
};

export default Login