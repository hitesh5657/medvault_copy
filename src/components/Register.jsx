import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import "../styles/Register.css";

function Register() {
  const [role, setRole] = useState("PATIENT"); // Default Patient
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    specialization: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const url =
        role === "DOCTOR"
          ? "http://localhost:8080/api/register/doctor"
          : "http://localhost:8080/api/register/patient";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Registration failed");
      }

      setSuccess("Registration submitted! Waiting for admin approval.");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
  <div className="register-container">
    <div className="register-card">
        <button 
          className="cancel-btn"
          onClick={() => navigate("/")}
        >
          <FaTimes />
        </button>
        <h2>Register</h2>
        <p className="subtitle">Create your account</p>

        {/* Role Selection */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={handleChange}
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="PATIENT">Patient</option>
          <option value="DOCTOR">Doctor</option>
           </select>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Show specialization only if Doctor is selected */}
          {role === "DOCTOR" && (
            <input
              type="text"
              name="specialization"
              placeholder="Specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
            />
          )}

          <button type="submit" className="btn">Register</button>
        </form>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}

        <p className="extra-text">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault(); 
              navigate(-1);       
            }}
          >Already have an account?</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
