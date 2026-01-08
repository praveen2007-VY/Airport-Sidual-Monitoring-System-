import { toast } from 'react-toastify';
import React, { useState } from "react";
import pass from "../../assets/pass2.png";
import "./Passenger.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Passenger = () => {

    const usenav = useNavigate();
    const handleho =()=>{
        usenav('/#login');
    }

    const passhandlelogin=()=>{
        usenav('/passenger/login')
    }

    const [name,setname] = useState("");
    const [email,setemail] = useState("");
    const [pass,setpass] = useState("");
    const [cpass,setcpass] = useState("");
    
    const handlesub = async()=>{
      
      if (pass=="" || cpass =="" || name=="" || email==""){
        toast.error("Please fill all the fields");
        return
      }
      if(pass!=cpass){
           toast.error("Password Mismatch");
           return
      }
      let res = await axios.post("http://localhost:5000/addpassenger")
      console.log(res);
      res.save({
        name:name,
        email:email, 
        password:pass
      })
      toast.success("Passenger Added Successfully");
    }
    
    
  return (
    <>
      <section id="sec0">
        <div className="Passenger1">
          <div className="passimg">
            <img src={pass} alt="" />
          </div>
          <div>
            <img src="" alt="" />
          </div>
          <div className="passinput">
            <div class="passenger-bg">
                 <a href="#login"><button class="pass-back-home-btn" onClick={handleho}><i class="fa-solid fa-arrow-left"></i></button></a>
              <div class="pass-signup-card">
                
                <div class="pass-signup-header">
                 
                  <i class="fa-solid fa-user-plus"></i>
                  <h2>Create Passenger Account</h2>
                  <p>Register to track your flights easily</p>
                </div>

                <form class="pass-signup-form">
                  <div class="pass-input-group">
                    <i class="fa-solid fa-user"></i>
                    <input type="text" placeholder="Full Name" required  onChange={(e)=>setname(e.target.value)}  value={name}/>
                  </div>

                  <div class="pass-input-group">
                    <i class="fa-solid fa-envelope"></i>
                    <input type="email" placeholder="Email Address" required  onChange={(e)=>setemail(e.target.value)}  value={email}/>
                  </div>

                  <div class="pass-input-group">
                    <i class="fa-solid fa-lock"></i>
                    <input type="password" placeholder="Password" required  onChange={(e)=>setpass(e.target.value)}  value={pass}/>
                  </div>

                  <div class="pass-input-group">
                    <i class="fa-solid fa-lock"></i>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      required
                       onChange={(e)=>setcpass(e.target.value)}  value={cpass}
                    />
                  </div>

                  <button class="pass-signup-btn" onClick={handlesub} >Sign Up</button>

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
