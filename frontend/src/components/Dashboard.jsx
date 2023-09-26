import React from "react";
import "./Dashboard.css";
import logo from "../images/angular.png";
import profile from "../images/blank-profile-picture-hd-images-photo-6.JPG";
import people from "../images/Untitled.png";
import { useState, useEffect } from "react";
import axios from "axios";

export function Dashboard() {
  let [userId, setUserId] = useState(0);
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: null,
    department: "",
    job: "",
    permission_group: "",
  });

  const getResponse = async () => {
    try {
      if (userId !== 0) {
        const response = await axios.get(`http://localhost:8000/${userId}/`);
        const fetchedUser = response.data;
        setUser(fetchedUser);
        console.log("dasd");
      } else {
        const fetchedUser = {
          name: "",
          email: "",
          mobile: "",
          department: "",
          job: "",
          permission_group: "",
        };
        setUser(fetchedUser);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUserId(userId - 1);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const addEditUser = async () => {
    if (userId === 0) {
      await axios.post(`http://localhost:8000/add/`, user);
      console.log("Success");
    } else {
      await axios.put(`http://localhost:8000/edit/${userId}/`, user);
    }
  };

  const deleteUser = async () => {
    if (userId !== 0) {
      await axios.delete(`http://localhost:8000/delete/${userId}/`);
      console.log("Successfully Deleted");
      setUserId(0);
    }
  };

  const nextUser = () => {
    setUserId(userId + 1);
  };

  const previousUser = () => {
    if (userId > 0) {
      setUserId(userId - 1);
    }
  };

  useEffect(() => {
    getResponse();
    console.log("dsad");
  }, [userId]);
  return (
    <div className="dashboard">
      <div className="sidebar">
        <div style={{ paddingLeft: "50px", paddingBottom: "40px" }}>
          <img src={logo} alt="Logo" style={{ width: "50%", height: "auto" }} />
        </div>
        <hr
          style={{
            backgroundColor: "#B2BABB",
            height: "3px",
            border: "none",
            width: "200px",
          }}
        />
        <div className="links">
          <div>Admin:</div>
          <br />
          <a href="#1">Link 1</a>
          <a href="#2">Link 2</a>
          <a href="#3">Link 3</a>
          <a href="#4">Link 4</a>
          <a href="#5">Link 5</a>
          <a href="#6">Link 6</a>
          <a href="#7">Link 7</a>
          <a href="#8">Link 8</a>
          <a href="#9">Link 9</a>
          <a href="#10">Link 10</a>
        </div>
      </div>
      <div className="landing">
        <div className="lan_header">
          <span>DashBoard</span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <span>
              Welcome Back! <span style={{ fontWeight: "bold" }}>Admin</span>
            </span>
            <div className="profile_info">
              <img
                src={profile}
                alt="profile"
                style={{ width: "20%", height: "auto" }}
              />
              logout
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-bell"
                viewBox="0 0 16 16"
              >
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-three-dots"
                viewBox="0 0 16 16"
              >
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="lan_body">
          <div className="lan_body_sec1">Personal Add/Edit</div>
          <div className="lan_body_sec2">
            <form action="">
              <div>
                <select
                  name="department"
                  id="department"
                  value={user.department}
                  onChange={handleChange}
                >
                  <option value="">Department</option>
                  <option value="hr">Human Resources</option>
                  <option value="developer">Development</option>
                </select>
                <select
                  name="job"
                  id="job"
                  value={user.job}
                  onChange={handleChange}
                >
                  <option value="">Job</option>
                  <option value="hr">HR</option>
                  <option value="developer">Developer</option>
                </select>
                <select
                  name="permission_group"
                  id="permission_group"
                  value={user.permission_group}
                  onChange={handleChange}
                >
                  <option value="">Permission Group</option>
                  <option value="staff">Staff</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="form_info">
                <div style={{display:"flex", flexDirection:"column"}}>
                  <div>
                    <label for="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label for="mobile">Mobile</label>
                    <input
                      type="text"
                      id="mobile"
                      name="mobile"
                      value={user.mobile}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label for="email">Email</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div style={{ display: "inline-block" }}>
                  <img src={people} alt="" />
                </div>
              </div>
              <div style={{ position: "relative", right: "200px" }}>
                <input type="button" value="Save" onClick={addEditUser} />
                <input type="button" value="Update" onClick={addEditUser} />
                <input type="button" value="Delete" onClick={deleteUser} />
              </div>
            </form>
            <div className="counter">
              <input type="button" value="Previous" onClick={previousUser} />
              <input type="text" value={userId} />
              <input type="button" value="Next" onClick={nextUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
