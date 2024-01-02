import React, { useState, useEffect } from "react";
import "./Nav.css";
import { useNavigate } from 'react-router-dom';

export default function Nav() {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  
  const navigate = useNavigate();
  
  useEffect(() => {
    window.addEventListener("scroll", () => {
      console.log("window.scrollY", window.scrollY);
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    
    return () => {
      window.removeEventListener("scroll", () => { });
    };
  }, []);
  
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  }
  
  return (
    <nav className={`nav ${show && 'nav_black'}`}>
      <img
        alt="Netflix logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        className="nav_logo"
        onClick={() => (window.location.href = "/")}
      />
      <input value={searchValue} onChange={handleChange} className='nav_input' type='text' placeholder='영화를 검색해주세요.' />

      <img
        alt="User Logged"
        src="https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
        className="nav_avatar"
      />
    </nav>
  );
}