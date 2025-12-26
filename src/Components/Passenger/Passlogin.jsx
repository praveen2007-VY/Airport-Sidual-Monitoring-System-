import React from "react";
import "./Passenger.css";
import pass from "../../assets/pass.png";
import { useNavigate } from "react-router-dom";
const Passlogin = () => {

    const usenav = useNavigate();

    const hanglesignup = ()=>{
        usenav('/passenger');
    }
    const handleforgot=()=>{
        usenav('/passenger/login/forgot');
    };

  return (
    <>
      <section id="sec">
        <div className="Passenger2">
          <div className="passimg2">
          </div>
          <div className="passinput2">
            <div class="passl-login-bg">
              <button class="passl-back-home-btn" onClick={hanglesignup}><i class="fa-solid fa-arrow-left"></i></button>
              <div class="passl-login-card">
                <div class="passl-login-header">
                  <i class="fa-solid fa-user"></i>
                  <h2>Passenger Login</h2>
                  <p>Access your flight information</p>
                </div>

                <form class="passl-login-form">
                  <div class="passl-input-group">
                    <i class="fa-solid fa-envelope"></i>
                    <input type="email" placeholder="Email Address" required />
                  </div>

                  <div class="passl-input-group">
                    <i class="fa-solid fa-lock"></i>
                    <input type="password" placeholder="Password" required />
                  </div>

                  <div class="passl-options">
                    <a href="" class="passl-forgot" onClick={handleforgot} >
                      Forgot Password?
                    </a>
                  </div>

                  <button class="passl-login-btn">Login</button>

                  <p class="passl-signup-link">
                    Don’t have an account? <a href="" onClick={hanglesignup}>Sign Up</a>
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

export default Passlogin;
