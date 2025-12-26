import { useNavigate } from 'react-router-dom';
import React from "react";
import './Adminlog.css'
import admin from "../../assets/admin.png";
const Adminlog = () => {
   
  const usenav = useNavigate();
  const handleForget = () => {
    usenav('/adminforget');
  };
    
  const handleho = () => {
    usenav('/');
  };
  return (
    <>
    <section>
      <div className="admin1">
        <div className="admin11">
          <img src={admin} alt="" />
        </div>
        <div className="admin12">
          <div class="login-container">
            <div class="login-card">
              <h2>Admin Login</h2>

              <div class="input-group">
                <label>Email Address</label>
                <div class="input-box">
                  <span class="icon">📧</span>
                  <input type="email" placeholder="admin@email.com" />
                </div>
              </div>

              <div class="input-group">
                <label>Password</label>
                <div class="input-box">
                  <span class="icon">🔒</span>
                  <input type="password" placeholder="••••••••" />
                </div>
              </div>

              <div class="forgot adbackfor">
                <p onClick={handleForget} >Forgot password?</p>
              </div>

              <button class="alogin-btn">Admin Login</button>

              <p class="note">🔑 Admin access only</p>
            </div>
          </div>
           <button className='kk' onClick={handleho}><i class="fa-solid fa-arrow-left bb"></i> Back To Home</button>
        </div>
      </div>
    </section>

    </>
  );
};

export default Adminlog;
