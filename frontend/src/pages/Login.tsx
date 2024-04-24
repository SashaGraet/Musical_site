import React, {FC, SyntheticEvent, useContext, useState} from "react";
import { Navigate, redirect, useLocation, useNavigate } from "react-router-dom";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const LoginForm: FC = () => {

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {store} = useContext(Context)
    const navigate = useNavigate()


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
              store.login_user(login, password).then(() => {
                navigate('/profile')
              })
            }}
          >Войти</button>
        </form>
    );
};

export default observer(LoginForm);