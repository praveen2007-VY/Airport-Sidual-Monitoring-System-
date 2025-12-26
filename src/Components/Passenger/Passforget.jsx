import React from "react";
import "./Passenger.css";
import { useNavigate } from "react-router-dom";
const Passforget = () => {

    const usenav = useNavigate();

    const hangleho=()=>{
        usenav('/passenger/login')
    }

    const handlelogin=()=>{
        usenav('/passenger/login');
    };
   
    
  return (
    <>
      <section id="sec2">
        <div className="Passenger3">
          <div className="passimg3"></div>
          <div className="passinput3">
            <div class="passf-forgot-bg">
                <button class="passf-back-btn" onClick={hangleho}><i class="fa-solid fa-arrow-left"></i></button>
              <div class="passf-forgot-card">
                <div class="passf-forgot-header">
        

                  <i class="fa-solid fa-key"></i>
                  <h2>Forgot Password</h2>
                  <p>Enter your registered email to reset your password</p>
                </div>

                <form>
                  <div class="passf-input-group">
                    <i class="fa-solid fa-envelope"></i>
                    <input
                      type="email"
                      placeholder="Registered Email Address"
                      required
                    />
                  </div>

                  <button class="passf-reset-btn">Send Reset Link</button>

                  <p class="passf-login-link">
                    Remembered your password? <a href="" onClick={handlelogin}>Login</a>
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

export default Passforget;
