import React from "react";
import "./Firstpage.css";
import admin from "../assets/admin.png"
import staff from "../assets/staff.png"
import pass from "../assets/pass.png"
import about from "../assets/image.png"
import contact from "../assets/contact.png"
import { useLocation, useNavigate } from "react-router-dom";
const Firstpage = () => {


  

  const usenav = useNavigate();

  const ahandleLogin = () => {
    usenav('/adminlog');
  };

  const shandleLogin = () => {
    usenav('/stafflog');
  };

  const passsignup = ()=>{
    usenav('/passenger');
  };
  return (
    <>
    <section id="home">
     <div className="main1">
  
      <nav className="nav">
        <h2 className="brandhome">
          <i className="fa-solid fa-plane-departure flight"></i>
          Airport Schedule Monitoring System
        </h2>
        <div className="navc">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
       <a href="#login"> <button className="login-btn">
          <i className="fa-solid fa-right-to-bracket bb"></i>
          Login
        </button></a>
      </nav>

      
      <div className="hero">
        <h1 className="hero-title">Welcome to Airport Schedule System</h1>
        <p className="hero-subtitle" >
          A real-time platform to monitor flight schedules, gate assignments,
          and airport operations efficiently.
        </p>

        <a href="#login"><button className="get-btn">
          <i className="fa-solid fa-arrow-right flight"></i>
          Get Started
        </button></a>
      </div>
      </div>
      </section>
      
        <section id="login">
          <div className="main2">
             <div className="main21">
              <div className="box1">
                <div className="img1">
                  <img src={admin} alt="" />
                </div>
               <h3>For Admins</h3> 
               <p>Manage flights & operations</p>
               <button className="rb admin" onClick={ahandleLogin}>Admin Login</button>
              </div>
              <div className="box2">
                <div className="img1">
                  <img src={staff} alt="" />
                </div>
                <h3>For Staff</h3>
                <p>Update flight Status & gate assign</p>
                 <button className="rb staff" onClick={shandleLogin}>Staff Login</button>
              </div>
              <div className="box3">
                <div className="img1">
                  <img src={pass} alt="" />
                </div>
                <h3>For Passengers</h3>
                <p>Check flight status & gate numbers</p>
                 <button className="rb passenger" onClick={passsignup}>Passenger Login</button>
              </div>
            </div>
          </div>
          </section>
          <section id="about">
          <div className="main3">
            <div className="main33">
              <h1>About</h1>
              <img src={about} alt="" />
            </div>
            <div className="main31">
              <h1>Why Choose Us?</h1>
              <p>The Airport Schedule Monitoring System is a web-based platform designed to manage and monitor airport flight schedules in real time. It improves coordination between administrators, staff, and passengers by providing accurate and up-to-date flight information.</p>          </div>
         </div>
         </section>
     
      <section id="contact">
        <div className="main4">
          <div className="con">
            <h1>Contact Information</h1>
            <p><span><i class="fa-solid fa-envelope-open-text"></i></span>Email: airportsystem@gmail.com</p>
            <p><span>📞</span>Phone: +1234567890</p>
            <p><span>📍</span>Location: Airport Operations Center, India</p>
          </div>
          <div className="conimg">
            <img src={contact} alt="" />
          </div>

        </div>
      </section>
      <footer class="footer">
        <p>© 2025 Airport Schedule Monitoring System</p>
        <span>Built using MERN Stack | Academic Project</span>
      </footer>

    </>
  );
};

export default Firstpage;
