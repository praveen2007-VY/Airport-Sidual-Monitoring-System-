import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import "./Stafflog.css";
import "../Passenger/Passforget.css";
import staff from "../../assets/staff.png";
import axios from 'axios';


const Stafflog = () => {

    const usenav = useNavigate();

    const handleho = () => {
        usenav('/#login');
    }

    const [staffe,setstaffe]=useState([]);

    useEffect(()=>{
        const fetchstaff = async () => {
            const res4 = await axios.get(`http://localhost:5000/staff`);
            setstaffe(res4.data);
          };
          fetchstaff();
    },[]);
   
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");

  const handlesub=()=>{
      
      staffe.map((n)=>{
        if(n.email==email && n.password==pass){
            alert("Login Successful");
            usenav(`/stafflog/staff/${n._id}`);
        }
      })
      
  }

  const forget=()=>{
    usenav('/stafflog/forgot');
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
                      placeholder="Staff ID / Email"
                      required
                      onChange={(e)=>setemail(e.target.value)}
                      value={email}
                    />
                  </div>

                  <div class="staff-input-group">
                    <i class="fa-solid fa-lock"></i>
                    <input type="password" placeholder="Password" required onChange={(e)=>setpass(e.target.value)} value={pass}/>
                  </div>
                  <div className="passenger-login__options">
                            <label className="passenger-login__remember-me" >
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    // checked={formData.rememberMe}
                                    // onChange={handleChange}
                                    className="passenger-login__checkbox"
                                />
                                Remember Me
                            </label>
                            <button className="passenger-login__forgot-link" onClick={forget}>
                                Forgot Password?
                            </button>
                        </div>
                  <button type="button" class="staff-login-btn" onClick={handlesub}>
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
