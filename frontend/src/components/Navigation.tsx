import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">Musical site</Link>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <Link to="/" className="nav-link active" aria-current="page">Главаня</Link>
                </li>
                <li className="nav-item">
                  <Link to="/searchusers" className="nav-link">Поиск музыкантов</Link>
                </li>
                <li className="nav-item">
                  <Link to="/search" className="nav-link">Поиск музыкальных групп</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">Регистрация</Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Профиль</Link>
                </li>
                
              </ul>
            </div>
          </div>
      </nav>
    );
};

export default Navigation