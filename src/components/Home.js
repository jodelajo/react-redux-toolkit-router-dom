import React from 'react'
import { NavLink} from "react-router-dom"

function Home() {
    return (
        <div>
             <h1>Welkom op dit fantastische inlog form</h1>

           <NavLink to="/inloggen">Log snel in!</NavLink> <br/>
           <NavLink to="/registreren">Of maak een account aan.</NavLink>
        </div>
    )
}

export default Home
