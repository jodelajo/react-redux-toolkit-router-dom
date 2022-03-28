import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useLocation,  useNavigate } from 'react-router'
import './Login.css'
import { useDispatch, useSelector} from "react-redux"
import { loginUser, userLoading, loginFailed, logoutUser } from '../../features/user'
import { APIUrl} from '../../config/config'
import jwtDecode from "jwt-decode";
import AuthForm from './AuthForm'

function Auth() {
const {status, error, userState} = useSelector((state) => state.user.value)
const location = useLocation()
const navigate = useNavigate()
console.log('status',status.access_token)
console.log('userstate', userState)
console.log(location.pathname)


    const dispatch = useDispatch()
  const [userToken, setUserToken] = useState()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


const headers = {
    headers: {
      authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

//   const tokenPayload = jwtDecode(userToken);
// console.log(tokenPayload)

  // useEffect(() => {
  //   if (!userToken) {
  //     return;
  //   }
  //   const tokenPayload = jwtDecode(userToken);
  //   const currentTimeUnixSeconds = Math.round(Date.now() / 1000);
  //   const isTokenExpired = tokenPayload.exp < currentTimeUnixSeconds;
  //   if (isTokenExpired) {
  //     logout();
  //   }
  // }, [userToken]);

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
      localStorage.setItem("token", content.access_token);
    } catch (error) {
        if (error.request.status === 401) {
            const message = JSON.parse(error.request.response).message;
            throw new Error(message);
          } else {
            throw new Error(
              "Something went wrong, please visit https://git.databeez.io/databeez/assessment-joanneke/-/tree/main, and let me know!"
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
    localStorage.setItem("token", content.access_token);
  } catch (error) {
      if (error.request.status === 401) {
          const message = JSON.parse(error.request.response).message;
          throw new Error(message);
        } else {
          throw new Error(
            "Something went wrong, please visit https://git.databeez.io/databeez/assessment-joanneke/-/tree/main, and let me know!"
          );
        }
  }
}

async function submitLogin(e) {
    // e.preventDefault();
    dispatch(userLoading())
    try {
      await login(email, password);
      dispatch(loginUser({email: email, password: password}))
      navigate("/details")
    } catch (error) {
      dispatch(loginFailed(error.message))
    }
  }

  async function submitRegister(e) {
    // e.preventDefault();
    dispatch(userLoading())
    try {
      await register(email, password);
      dispatch(loginUser({email: email, password: password}))
    } catch (error) {
      dispatch(loginFailed(error.message))
    }
  }

  const logout = () => {
    localStorage.clear();
    setUserToken("");
    setEmail("")
    dispatch(logoutUser())
  };

    return (
        <div className="loginWrapper">
          {location.pathname === "/inloggen" ?  <div>
        <h2>Inloggen</h2>
            <AuthForm 
            
            submitLogin={submitLogin} 
            email={email} 
            setEmail={setEmail} 
            password={password} 
            setPassword={setPassword}
            />
            </div> :
         
        <div>
        <h2>Registreren</h2>
            <AuthForm 
            
            submitLogin={submitRegister} 
            email={email} 
            setEmail={setEmail} 
            password={password} 
            setPassword={setPassword}
            />
        </div>}
           
           

          

            

            <div className="formMessage">
            {error && <p>{error}</p>}
            {status === "loading" && <p>Loading ...</p>}
            </div>
            <div className="welkom">
            {!error && userToken && <p>Welkom {userState.email}</p>}
      
            </div>
    

           
        </div>
    )
}

export default Auth
