import React, {FC, SyntheticEvent, useContext, useState} from "react";
import { Navigate, redirect, useLocation, useNavigate } from "react-router-dom";
import {ProfileContext} from "../App";

const LoginForm: FC = () => {

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate()
    const profile = useContext(ProfileContext)

    return (
        <form className="form-signin w-100 m-auto">
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

          <button className="btn btn-primary w-100 py-2" type="submit"
            onClick={(e) => {
              e.preventDefault();
              console.log(profile)
              profile?.loginUser(login, password).then(() => {
                navigate('/profile')
              })
            }}
          >Войти</button>
        </form>
    );
};

export default LoginForm;