import React, {useState} from 'react'
import axios from 'axios'
import {  useForm } from 'react-hook-form'
import './Login.css'
// import { useNavigate } from "react-router-dom";
import { APIUrl} from '../../config/config'

function Login() {
    const {handleSubmit} = useForm();
    // const navigate = useNavigate();
  const [userToken, setUserToken] = useState()
  const [user, setUser] = useState()
  const [formError, setFormError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState( process.env.REACT_APP_USERNAME || "")
  const [password, setPassword] = useState(process.env.REACT_APP_PASSWORD || "")

const api = process.env.REACT_APP_BACKEND
console.log('backend', api)


const headers = {
    headers: {
      authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

const login =  async(email, password) => {
    console.log('first')
    try {
        const response = await axios.post(`${APIUrl}`, {
            email,
            password,
            headers
        })
        const content = response.data
        console.log('response', response.data)
        setUserToken(content.access_token);
      setUser(content.username);
    //   navigate("/");
      localStorage.setItem("token", content.access_token);
      localStorage.setItem("user", content.email);
    } catch (error) {
        if (error.request.status === 401) {
            const message = JSON.parse(error.request.response).message;
            throw new Error(message);
          } else {
            throw new Error(
              "Something went wrong, please visit https://github.com/jodelajo/fndr/issues, and let me know!"
            );
          }
    }
}

async function submitLogin(e) {
    // e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      setFormError(error.message);
      setIsLoading(false);
    }
  }

    return (
        <div className="loginWrapper">
            <form onSubmit={handleSubmit(submitLogin)} className="loginForm">
                <input type="text" placeholder="username"
                 onChange={(e) => setEmail(e.target.value)}
                 required={true}
                 value={email}
                 className="email"
                />
                <input type="password" placeholder="password"  
                onChange={(e) => setPassword(e.target.value)}
                 required={true}
                value={password} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login
