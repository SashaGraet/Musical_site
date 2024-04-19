import React, { SyntheticEvent, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const Register = () => {

    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [check_psw, setPsw] = useState('');
    const [my_redirect, setMyRedirect] = useState(false);
    const location = useLocation();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email,
                login,
                password
            })
        });

        setMyRedirect(true);
    }
    
    if (my_redirect) {
        <Navigate to='/login' replace state={{from: location}}/>
    }

    return (
        <form onSubmit={submit}>
          <h1 className="h3 mb-3 fw-normal">Регистрация аккаунта</h1>

          <div className="form-floating">
            <input type="email" className="form-control" placeholder="Email adress" required
                onChange={e => setEmail(e.target.value)}
            />
            <label form="floatingInput">Email address</label>
          </div>

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

          <div className="form-floating">
            <input type="password" className="form-control" placeholder="Repeat Password" required
                onChange={e => setPsw(e.target.value)}
            />
            <label form="floatingInput">Repeat Password</label>
          </div>

          <button className="btn btn-primary w-100 py-2" type="submit">Регистрация</button>
        </form>
    )
}

export default Register;