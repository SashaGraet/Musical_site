import React, { SyntheticEvent, useState, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Context } from "..";


const Register = () => {

    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [check_psw, setPsw] = useState('');
    const [my_redirect, setMyRedirect] = useState(false);
    const location = useLocation();
    const {store} = useContext(Context)


    return (
        <form className="form-signin w-100 m-auto">
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

          <button className="btn btn-primary w-100 py-2" type="submit"
            onClick={() => store.register_user(email, login, password)}
          >Регистрация</button>
        </form>
    )
}

export default Register;