import React from 'react'
import {useDispatch} from 'react-redux'
import {logoutUser } from '../features/user'
import { useNavigate} from 'react-router-dom'

function Button() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear();
        dispatch(logoutUser())
        navigate("/")
      };

    return (
        <div>
             <button type="submit" onClick={logout} className="button">Logout</button>
        </div>
    )
}

export default Button
