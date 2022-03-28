import React, {useState} from 'react'
import axios from 'axios'
import {  useForm } from 'react-hook-form'
import './Login.css'

import { useDispatch, useSelector} from "react-redux"
import { loginUser, userLoading, loginFailed } from '../../features/user'

// import { useNavigate } from "react-router-dom";
import { APIUrl} from '../../config/config'

function Auth() {
const {status, error, } = useSelector((state) => state.user.value)
console.log('status',status)


    const {handleSubmit} = useForm();
    // const navigate = useNavigate();
    const dispatch = useDispatch()
  const [userToken, setUserToken] = useState()
  const [user, setUser] = useState()
  const [formError, setFormError] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState( process.env.REACT_APP_USERNAME || "")
  const [password, setPassword] = useState(process.env.REACT_APP_PASSWORD || "")

const api = process.env.REACT_APP_BACKEND
console.log('backend', api)
// console.log('loading', isLoading)


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
        const response = await axios.post(`${APIUrl}/login`, {
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
      localStorage.setItem("user", email);
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

const register =  async(email, password) => {
  console.log('first')
  try {
      const response = await axios.post(`${APIUrl}/register`, {
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
    localStorage.setItem("user", email);
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
    e.preventDefault();
    // setIsLoading(true);
    dispatch(userLoading())
    try {
      await login(email, password);
      dispatch(loginUser({email: email, password: password}))
    } catch (error) {
      setFormError(error.message);
      // setIsLoading(false);
      dispatch(loginFailed(error.message))
    }
    // setIsLoading(false)
  }

  async function submitRegister(e) {
    // e.preventDefault();
    // setIsLoading(true);
    try {
      await register(email, password);
    } catch (error) {
      setFormError(error.message);
      // setIsLoading(false);
    }
    // setIsLoading(false)
  }

  const logout = () => {
    localStorage.clear();
    setUserToken("");
    setUser("");
    setEmail("")
    setFormError("")
  };

    return (
        <div className="loginWrapper">
            <h2>Inloggen</h2>

            <form  className="loginForm">
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
                <button type="submit" onClick={submitLogin}>Submit</button>
            </form>

            

            <div className="formMessage">
            {formError && <p>{formError}</p>}
            {/* {isLoading && <p>...loading</p>} */}
            {status === "loading" && <p>Loading ...</p>}
            </div>
            <div className="welkom">
            {!formError && userToken && <><p>Welkom {email}</p>
            <button type="submit" onClick={logout}>Logout</button></>
            }
            </div>
    

           
        </div>
    )
}

export default Auth
