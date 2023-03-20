import { signOut } from 'firebase/auth';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../../../config/firebase';
import { AuthContext } from '../../../../context/AuthContext';

function Navbar() {

  const {isAuthenticated, dispatch} = useContext(AuthContext);


  const handleLogout = () => {
    signOut(auth)
    .then(() => {
      dispatch({ type: "LOGOUT" })
    })
    .catch(err => {
      console.error(err)
    })
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark navbar-dark">
  <div className="container">
    <Link to="/" className="navbar-brand">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to='/' className="nav-link active">Home</Link>
        </li>
        <li className="nav-item">
          <Link to='/todos' className="nav-link active">Todos</Link>
        </li>
        <li className="nav-item">
          <Link to='/about' className="nav-link">About</Link>
        </li>
        <li className="nav-item">
          <Link to='/contact' className="nav-link">Contact</Link>
        </li>
        {/* <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li> */}
      </ul>
      <div className="d-flex">
      {!isAuthenticated
      ? <Link to='/authentication/login' className="btn btn-primary text-white">Login</Link>
      : <>
       <Link to='/dashboard' className="btn btn-primary btn-sm text-white me-2">Dashboard</Link>
       <button className='btn btn-danger btn-sm' onClick={handleLogout}>Logout</button>
      </>
      }
        
      </div>
    </div>
  </div>
</nav>
  )
}

export default Navbar
