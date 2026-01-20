import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Staffreg.css";
import "./GlobalForms.css";
import axios from "axios";


const Staffreg = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleCancel = () => {
    navigate(-1);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    window.alert("Staff Registered Successfully");
    navigate(-1);
  };
  
  const [cstaff, setcstaff] = useState(1);

  const [staffid, setstaffid] = useState("");
  const [staffname, setstaffname] = useState("");
  const [staffemail, setstaffemail] = useState("");
  const [staffpassword, setstaffpassword] = useState("");
  const [staffconfirmpassword, setstaffconfirmpassword] = useState("");
  const [staffrole, setstaffrole] = useState("");
  const [staffdep, setstaffdep] = useState("");
  const [staffshift, setstaffshift] = useState("");
  const [staffsta, setstaffsta] = useState("Active");
  const [staffaccess, setstaffaccess] = useState("Allowed");
  const [staffaction, setaction] = useState("Deny")

  const handlesub = async () => {
    console.log(staffid);
    console.log(staffname);
    console.log(staffemail);
    console.log(staffpassword);
    console.log(staffconfirmpassword);
    console.log(staffrole);
    console.log(staffdep);
    console.log(staffshift);
    if (staffpassword != staffconfirmpassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    const data = {
      staffid: staffid,
      name: staffname,
      email: staffemail,
      password: staffpassword,
      role: staffrole,
      dept: staffdep,
      shift: staffshift,
      status: staffsta,
      access: staffaccess,
      action: staffaction
    };
    const res = await axios.post("http://localhost:5000/staffpost", data)
      .then((response) => {
        console.log(response);
        navigate(-1);
      })
      .catch((error) => {
        console.log(error);
      });

  };

  return (
    <div className="staff-reg-container">
      <div className="staff-form-card">
        <div className="staff-header">
          <h2>Staff Registration</h2>
          <p>Register staff members assigned by Admin</p>
        </div>

        <form className="staff-form" /*onSubmit={handleRegister}*/>
          <div className="form-row">
            <div className="form-group">
              <label>Staff ID</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-id-badge"></i>
                <input
                  type="text"
                  placeholder="e.g. STF005"
                  required
                  onChange={(e) => setstaffid(e.target.value)}
                  value={staffid}
                />
                {/* <select onChange={(e)=>{
                                    setstaffid(e.target.value),
                                    setcstaff(cstaff+1)
                                }}> 
                                    <option value={`STFID${cstaff+1}`}>{`STFID${cstaff+1}`}</option>
                                </select> */}
              </div>
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-user"></i>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  required
                  onChange={(e) => setstaffname(e.target.value)}
                  value={staffname}
                />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  placeholder="e.g. john@airport.com"
                  required
                  onChange={(e) => setstaffemail(e.target.value)}
                  value={staffemail}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-lock"></i>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  onChange={(e) => setstaffpassword(e.target.value)}
                  value={staffpassword}
                />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-lock"></i>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  onChange={(e) => setstaffconfirmpassword(e.target.value)}
                  value={staffconfirmpassword}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Role</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-briefcase"></i>
                <select
                  required
                  onChange={(e) => setstaffrole(e.target.value)}
                  value={staffrole}
                >
                  <option value="">Select Role</option>
                  <option value="Gate Manager">Gate Manager</option>
                  <option value="Flight Coordinator">Flight Coordinator</option>
                  <option value="Ground Staff">Ground Staff</option>
                  <option value="Security">Security</option>
                  <option value="Shuttle Driver">Shuttle Driver</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Department</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-building-user"></i>
                <select
                  required
                  onChange={(e) => setstaffdep(e.target.value)}
                  value={staffdep}
                >
                  <option value="">Select Department</option>
                  <option value="Operations">Operations</option>
                  <option value="Control Room">Control Room</option>
                  <option value="Runway">Runway</option>
                  <option value="Transport">Transport</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Shift</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-clock"></i>
                <select
                  required
                  onChange={(e) => setstaffshift(e.target.value)}
                  value={staffshift}
                >
                  <option value="">Select Shift</option>
                  <option value="Morning">Morning</option>
                  <option value="Evening">Evening</option>
                  <option value="Night">Night</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button type="button" className="btn-submit" onClick={handlesub}>
              <i className="fa-solid fa-user-check"></i> Register Staff
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Staffreg;
