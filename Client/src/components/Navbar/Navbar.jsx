import React from 'react'
import './navbar.css';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <>
  <nav className="navbar navbar-expand-lg ">
  <div className="container-fluid">
    <a className="navbar-brand fw-bold fs-1 mx-3 company-name" href="#">Formon</a>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse justify-content-between" id="navbarContent">
      <ul className="navbar-nav " style= {{marginLeft: "700px"}}>
        <li className="nav-item">
          <a className="nav-link active fw-300 fs-5 mx-3" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active fw-300 fs-5 mx-3" href="#">Features</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active fw-300 fs-5 mx-3" href="#">About Us</a>
        </li>
      </ul>

      <div className="d-flex" style={{marginght: "30px"}}>
        <Link to="/login"> <button className="btn btn-sm btn-outline-primary login-btn" type="button">Login</button></Link>
       
        <button className="btn btn-sm btn-outline-primary signup-btn" type="button">Get Started</button>
      </div>
    </div>
  </div>
</nav>

</>
  )
}

export default Navbar