import React, { useState } from "react";
import "./PassengerRegister.css";
import passenger from "../../assets/pass3.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const PassengerRegister = () => {
  const usenav = useNavigate();

  const gologin = () => {
    usenav("/passenger/login");
  };

  const handleho = () => {
    usenav("/#login");
  };

  const passhandlelogin = () => {
    usenav("/passenger");
  };
  
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [cpass, setcpass] = useState("");

  const handlesub = async () => {
    if (pass == "" || cpass == "" || name == "" || email == "") {
      toast.error("Please fill all the fields");
      return;
    }
    if (pass != cpass) {
      toast.error("Password Mismatch");
      return;
    }
    let data = {
      name: name,
      email: email,
      password: pass,
    };
    let res = await axios.post("http://localhost:5000/addpassenger", data);
    console.log(res);
    toast.success("Passenger Added Successfully");
    setcpass("");
    setemail("");
    setname("");
    setpass("");

  };

  return (
    <div className="passenger-register">
      {/* Left Section: Illustration */}
      <div className="passenger-register__illustration-container">
        <img
          src={passenger}
          alt="Airport Terminal"
          className="passenger-register__illustration"
        />
        <div className="passenger-register__overlay"></div>
      </div>

      {/* Right Section: Registration Form */}
      <div className="passenger-register__form-container boxsho">
        <button className="passenger-register__back-btn" aria-label="Go back" onClick={handleho}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>

        <div className="passenger-register__card">
          <h2 className="passenger-register__title">Account Registration</h2>
          <p className="passenger-register__subtitle">
            Join the Airport Management System
          </p>

          <form
            className="passenger-register__form"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Full Name */}
            <div className="passenger-register__input-group">
              <span className="passenger-register__icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </span>
              <input
                type="text"
                name="fullName"
                className="passenger-register__input"
                placeholder="Full Name"
                onChange={(e) => setname(e.target.value)}
                value={name}
              />
              <div className="passenger-register__focus-ring"></div>
            </div>

            {/* Email Address */}
            <div className="passenger-register__input-group">
              <span className="passenger-register__icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </span>
              <input
                type="email"
                name="email"
                className="passenger-register__input"
                placeholder="Email Address"
                onChange={(e) => setemail(e.target.value)}
                value={email}
              />
              <div className="passenger-register__focus-ring"></div>
            </div>

            {/* Password */}
            <div className="passenger-register__input-group">
              <span className="passenger-register__icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <input
                type="password"
                name="password"
                className="passenger-register__input"
                placeholder="Password"
                onChange={(e) => setpass(e.target.value)}
                value={pass}
              />
              <div className="passenger-register__focus-ring"></div>
            </div>

            {/* Confirm Password */}
            <div className="passenger-register__input-group">
              <span className="passenger-register__icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  <line x1="12" y1="15" x2="12" y2="17"></line>
                  {/* Added a small detail to differentiate icon if needed, but lock is standard */}
                </svg>
              </span>
              <input
                type="password"
                name="confirmPassword"
                className="passenger-register__input"
                placeholder="Confirm Password"
                onChange={(e)=>setcpass(e.target.value)}
                value={cpass}
              />
              <div className="passenger-register__focus-ring"></div>
            </div>

            <button 
            // className="passenger-register__submit-btn" 
            className="createpass"
            onClick={handlesub}>Create Account</button>
          </form>

          <p className="passenger-register__footer">
            Already have an account?{" "}
            <span onClick={gologin} className="passlogin">
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PassengerRegister;
