// import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Adminlog.css";
import adminphoto from "../../assets/admin.png";
import axios from "axios";
import { toast } from "react-toastify";

const Adminlog = () => {
  const usenav = useNavigate();
  const handleForget = () => {
    usenav("/adminforget");
  };

  const handleho = () => {
    usenav("/#login");
  };

  const [email, setemail] = useState();
  const [pass, setpass] = useState();

  const [admin, checkadmin] = useState([]);

  const fetchtodo = async () => {
    const res = await axios.get("http://localhost:5000/adminpass");
    checkadmin(res.data);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = admin.find((n) => n.email === email);
    if (!user) {
      toast.info("Email does not exist");
      return;
    }
    if (user.password !== pass) {
      toast.error("Password does not match");
      return;
    }
    toast.success("Login Successfully");
    usenav(`admin/${user._id}`);
  };

  useEffect(() => {
    fetchtodo();
  }, []);

  return (
    <>
      <section>
        <div className="admin1">
          <div className="admin11">
            <img src={adminphoto} alt="" />
          </div>
          <div className="admin12">
            <div class="login-container">
              <div class="login-card">
                <h2>Admin Login</h2>

                <div class="input-group">
                  <label>Email Address</label>
                  <div class="input-box">
                    <span class="icon">📧</span>
                    <input
                      type="email"
                      placeholder="admin@email.com"
                      onChange={(e) => setemail(e.target.value)}
                      value={email}
                    />
                  </div>
                </div>

                <div class="input-group">
                  <label>Password</label>
                  <div class="input-box">
                    <span class="icon">🔒</span>
                    <input
                      type="password"
                      placeholder="••••••••"
                      onChange={(e) => setpass(e.target.value)}
                      value={pass}
                    />
                  </div>
                </div>

                <div class="forgot adbackfor">
                  <p onClick={handleForget}>Forgot password?</p>
                </div>

                <button class="alogin-btn" onClick={handleLogin}>
                  Admin Login
                </button>

                <p class="note">🔑 Admin access only</p>
              </div>
            </div>
            <a href="#login">
              <button className="kk" onClick={handleho}>
                <i class="fa-solid fa-arrow-left bb"></i> Back To Home
              </button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Adminlog;
