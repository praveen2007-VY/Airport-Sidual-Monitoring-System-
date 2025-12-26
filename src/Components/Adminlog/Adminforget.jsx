import React from "react";
import './Adminlog.css'
import admin from "../../assets/admin.png";
import { useNavigate } from "react-router-dom";

const Adminforget = () => {

    const usenav = useNavigate();

    const handleLogin = () => {
        usenav('/adminlog');
    };
  return (
    <>

      <section className="adm1">
        <div className="adminfor">
                <div className="adminfor1  admin11">
                  <img src={admin} alt="" />
                </div>
        </div>
        <div className="adminfor2">
        <div class="forgot-container">
          <div class="forgot-card">
            <h2>Forgot Password</h2>
            <p class="info">
              Enter your registered email address. <br />
              We’ll send you a password reset link.
            </p>

            <div class="ainput-group">
              <label>Email Address</label>
              <input type="email" placeholder="admin@email.com" />
            </div>

            <button class="reset-btn">Send Reset Link</button>

           <p className="back-link adbackfor" onClick={handleLogin}>
              <i className="fa-solid fa-arrow-left bb"></i>Back to Login
           </p>
          </div>
        </div>
        </div>
      </section>
    </>
  );
};

export default Adminforget;
