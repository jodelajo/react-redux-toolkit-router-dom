import React from 'react'
import { useSelector } from 'react-redux'
import Button from './Button'

function Details() {
const { userState } = useSelector((state) => state.user.value)
console.log(userState)
    return (
        <div className="details">
           <p> Jouw email: {userState.email} </p> 
           <p>Jouw wachtwoord😱: {userState.password}</p>
           <Button/>
        </div>
       
    )
}

export default Details
