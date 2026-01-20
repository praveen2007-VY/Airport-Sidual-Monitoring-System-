import React, { useEffect, useState } from "react";
import "./Passforget.css";
import passenger from "../../assets/pass3.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Passforget = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const [passdata, checkpass] = useState([]);

  const [otpsent, setOtpsent] = useState("");

  const fetchtodo = async () => {
    try {
      const res = await axios.get("http://localhost:5000/passengerpass");
      checkpass(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchtodo();
    setOtpsent("");
    setOtp(["", "", "", ""]);
    setMessage({ type: "", text: "" });
    setEmail("");
    setNewPassword("");
    setConfirmPassword("");
  }, []);

  const webhook =
    "https://local.workflow-praveen.xyz/webhook/8af46cc9-1f8d-4292-9874-b0b6f4f72c04";
  const otpcall = async (val) => {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
        Otp: val,
      }),
    });
  };

  const otpgen = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const [passid, setpassid] = useState("");
  const handleSendOTP = async (e) => {
    e.preventDefault();
    const user = passdata.find((n) => n.email === email);
    if (!user) {
      setMessage({
        type: "error",
        text: "Email not found. Please enter valid email",
      });
      return;
    }
    setpassid(user._id);
    const otpValue = otpgen();
    setOtpsent(otpValue);
    otpcall(otpValue);

    setTimeout(() => {
      setMessage({
        type: "success",
        text: "OTP sent successfully to your email",
      });
      setStep(2);
    }, 1000);
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };
  
  const usenav = useNavigate();
  const handleVerifyOTP = (e) => {
    e.preventDefault();

    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4 || enteredOtp !== otpsent) {
      setMessage({ type: "error", text: "Invalid OTP. Please try again." });
      setOtp(["", "", "", ""]);
      setTimeout(() => {
        document.getElementById("otp-0")?.focus();
      }, 100);

      return;
    }
    setMessage({ type: "success", text: "OTP Verified Successfully" });
    setTimeout(() => setStep(3), 800);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }
    if (newPassword.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters",
      });
      return;
    }
    const res = await axios.put(
      `http://localhost:5000/passengerforget/${passid}`,
      {
        password: newPassword,
      },
    );
    setMessage({ type: "success", text: "Password Updated Successfully!" });
    fetchtodo();
    setOtpsent("");
    setOtp(["", "", "", ""]);
    setMessage({ type: "", text: "" });
    setEmail("");
    setNewPassword("");
    setConfirmPassword("");
    setEmail("");
    toast.success("Password updated successfully! Please log in.");
    usenav("/adminlog");
  };

  const isMatch =
    newPassword && confirmPassword && newPassword === confirmPassword;
  const isMismatch = confirmPassword && newPassword !== confirmPassword;

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <div className="passenger-register__illustration-container">
          <img
            src={passenger}
            alt="Airport Terminal"
            className="passenger-register__illustration"
          />
          <div className="passenger-register__overlay"></div>
        </div>
        <div className="forgot-form-section">
          <button
            className="back-btn"
            onClick={() =>
              step > 1 ? setStep(step - 1) : window.history.back()
            }
          >
            <svg
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

          <div className="forgot-header">
            <div className="icon-badge">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h1>Forgot Password?</h1>
            <p className="subtitle">
              {step === 1 && "Enter your email to receive an OTP."}
              {step === 2 && "Enter the 4-digit code sent to your email."}
              {step === 3 && "Create a new strong password."}
            </p>
          </div>

          <div className="step-indicator">
            <div className={`step-dot ${step >= 1 ? "active" : ""}`}></div>
            <div className="step-line"></div>
            <div className={`step-dot ${step >= 2 ? "active" : ""}`}></div>
            <div className="step-line"></div>
            <div className={`step-dot ${step >= 3 ? "active" : ""}`}></div>
          </div>

          {message.text && (
            <div
              className={`msg-box ${message.type === "success" ? "msg-success" : "msg-error"}`}
            >
              {message.text}
            </div>
          )}

          <form
            onSubmit={
              step === 1
                ? handleSendOTP
                : step === 2
                  ? handleVerifyOTP
                  : handleUpdatePassword
            }
          >
            {step === 1 && (
              <div className="form-step fade-in">
                <div className="input-group">
                  <span className="input-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </span>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="primary-btn">
                  Send OTP
                </button>
              </div>
            )}
            {step === 2 && (
              <div className="form-step fade-in">
                <div className="otp-group">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      className="otp-box"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !otp[index] && index > 0) {
                          document.getElementById(`otp-${index - 1}`).focus();
                        }
                      }}
                    />
                  ))}
                </div>
                <button type="submit" className="primary-btn">
                  Verify OTP
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="form-step fade-in">
                <div className="input-group">
                  <span className="input-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
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
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div
                  className={`input-group ${isMatch ? "match-success" : isMismatch ? "match-error" : ""}`}
                >
                  <span className="input-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                    </svg>
                  </span>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {isMatch && (
                  <p className="match-text success">Passwords match</p>
                )}
                {isMismatch && (
                  <p className="match-text error">Passwords do not match</p>
                )}

                <button type="submit" className="primary-btn">
                  Update Password
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Passforget;
