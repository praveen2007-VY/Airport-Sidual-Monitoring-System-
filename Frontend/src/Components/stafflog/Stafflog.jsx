import { useNavigate } from 'react-router-dom';
import React from "react";
import "./Stafflog.css";
import staff from "../../assets/staff.png";
const Stafflog = () => {

    const usenav = useNavigate();

    const handleho = () => {
        usenav('/#login');
    }
  return (
    <>
      <section>
        <div className="staff-log">
          <div className="staff-log-img">
            <img src={staff} alt="" />
          </div>
          <div className="staff-log-input">
            <div class="staff-bg">
              <a href="#login"><button class="staff-back-home-btn" onClick={handleho}>← Back to Home</button></a>

              <div class="staff-login-card">
                <div class="staff-login-header">
                  <i class="fa-solid fa-user-tie"></i>
                  <h2>Staff Login</h2>
                  <p>Airport Operations Access</p>
                </div>

                <form class="staff-login-form">
                  <div class="staff-input-group">
                    <i class="fa-solid fa-user"></i>
                    <input
                      type="text"
                      placeholder="Staff ID / Username"
                      required
                    />
                  </div>

                  <div class="staff-input-group">
                    <i class="fa-solid fa-lock"></i>
                    <input type="password" placeholder="Password" required />
                  </div>

                  <button type="submit" class="staff-login-btn">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Stafflog;
