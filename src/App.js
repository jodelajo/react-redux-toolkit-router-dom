import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Auth from './components/login/Auth';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <nav className="navBar">
        <Link to='/'>Home</Link>
        <Link to="/registreren">Registreren</Link>
        <Link to="/inloggen">Inloggen</Link>
      </nav>
    <h1>Welkom op dit fantastische inlog form</h1>
     <Routes>
       <Route path="/"  />
       <Route path="/inloggen" element={<Auth />}  />
       <Route path="/registreren" element={<Register />}  />


     </Routes>
    </div>
  );
}

export default App;
