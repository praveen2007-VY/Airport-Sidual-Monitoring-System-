import React from "react";
import pass from "../../assets/pass2.png";
import "./Passenger.css";
import { useNavigate } from "react-router-dom";
const Passenger = () => {

    const usenav = useNavigate();
    const handleho =()=>{
        usenav('/');
    }

    const passhandlelogin=()=>{
        usenav('/passenger/login')
    }
  return (
    <>
      <section id="sec0">
        <div className="Passenger1">
          <div className="passimg">
            <img src={pass} alt="" className="pass-img"/>
          </div>
          <div className="passinput">
            <div class="passenger-bg">
                 <button class="pass-back-home-btn" onClick={handleho}><i class="fa-solid fa-arrow-left"></i></button>
              <div class="pass-signup-card">
                
                <div class="pass-signup-header">
                 
                  <i class="fa-solid fa-user-plus"></i>
                  <h2>Create Passenger Account</h2>
                  <p>Register to track your flights easily</p>
                </div>

                <form class="pass-signup-form">
                  <div class="pass-input-group">
                    <i class="fa-solid fa-user"></i>
                    <input type="text" placeholder="Full Name" required />
                  </div>

                  <div class="pass-input-group">
                    <i class="fa-solid fa-envelope"></i>
                    <input type="email" placeholder="Email Address" required />
                  </div>

                  <div class="pass-input-group">
                    <i class="fa-solid fa-lock"></i>
                    <input type="password" placeholder="Password" required />
                  </div>

                  <div class="pass-input-group">
                    <i class="fa-solid fa-lock"></i>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      required
                    />
                  </div>

                  <button class="pass-signup-btn" >Sign Up</button>

                  <p class="pass-login-link">
                    Already have an account? <a href="" onClick={passhandlelogin}>Login</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Passenger;
