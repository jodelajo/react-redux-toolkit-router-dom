import React from 'react'
import {  useForm } from 'react-hook-form'
import { useNavigate, useLocation} from 'react-router-dom'
import { useDispatch} from "react-redux"
import { login, userLoading, loginFailed } from '../../features/user'

function LoginForm({submitLogin, email, setEmail, password,setPassword, submitRegister}) {
    const dispatch = useDispatch()
    const location = useLocation()
    const {handleSubmit} = useForm();

    console.log('location', location.pathname)

    // const submitHandler = () => {
    //     if (location.name === "/registreren") {
    //         return submitRegister
    //     } else {
    //         return submitLogin
    //     }
    // }
    return (
        <div>
            <form onSubmit={handleSubmit(submitLogin)} className="loginForm">
                <label htmlFor="email">
                <input type="text" placeholder="email"
                 onChange={(e) => setEmail(e.target.value)}
                 required={true}
                 value={email}
                 className="email"
                />
                </label>
                
                <input type="password" placeholder="password"  
                onChange={(e) => setPassword(e.target.value)}
                 required={true}
                value={password} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default LoginForm
