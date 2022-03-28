import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Auth from './components/login/Auth';
import Register from './components/Register';
import Details from './components/Details';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <nav className="navBar">
        <Link to='/'>Home</Link>
        <Link to="/registreren">Registreren</Link>
        <Link to="/inloggen">Inloggen</Link>
        <Link to="/details">Details</Link>
      </nav>
   
     <Routes>
       <Route path="/"  element={ <Home/>}/>
       <Route path="/inloggen" element={<Auth />}  />
       <Route path="/registreren" element={<Register />}  />
       <Route path="/details" element={<Details />}  />


     </Routes>
    </div>
  );
}

export default App;
