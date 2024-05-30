import React, { SyntheticEvent, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {ProfileContext} from "../App";


const Register = () => {

    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [check_psw, setPsw] = useState('');
    const navigate = useNavigate()
    const profile = useContext(ProfileContext)

    document.addEventListener('DOMContentLoaded', () => {
        const form: HTMLFormElement | null = document.getElementById('myForm') as HTMLFormElement;
        const inputs: NodeListOf<HTMLInputElement> = form.querySelectorAll('input[type="email"], input[type="login"], input[type="password"]');
        const submitButton: HTMLButtonElement | null = document.getElementById('submitButton') as HTMLButtonElement;

        function checkFormCompletion(): void {
            let allFilled: boolean = true;
            inputs.forEach(input => {
                if (input.value.trim() === '') {
                    allFilled = false;
                }
            });

            if (allFilled && submitButton) {
                submitButton.disabled = true;
            } else if (!allFilled && submitButton) {
                submitButton.disabled = false;
            }
        }

        inputs.forEach(input => {
            input.addEventListener('input', checkFormCompletion);
        });
    });

    return (
        <form className="form-signin w-100 m-auto" id='myForm'>
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

          <button className="btn btn-primary w-100 py-2" type="submit" disabled={true} id='submitButton'
            onClick={(e) => {
              e.preventDefault();
              profile?.registrationUser(email, login, password).then(() => {
                navigate('/login')
              })
            }}
          >Регистрация</button>
        </form>
    )
}

export default Register;