import React, { useState } from 'react';
import "../CSS/emailverify.css";
import axios from 'axios';

const VerifyEmail = () => {
  const [email, setEmail] = useState("")

  const handleChange = (e) => {
    setEmail(e.target.value)
  }
  const handleSubmit =async (e) => {
    e.preventDefault()
    try {
      console.log(email)
      const res=await axios.post("http://localhost:3005/api/verifyEmail",{email})
      console.log(res)
      if (res.status==200) {
        alert(res.data.msg)
        localStorage.setItem('email', email)
      }else{
        // alert("email already exist")
        alert(res.msg);
        
        alert(res.data.msg)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="verify-container">
      <h1>Email Verification</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address:</label>
          <input  type="email"  name="email"  value={email}  onChange={handleChange}  required  placeholder="Enter your email" />
        </div>
        <button type="submit" className="btn-verify">  Verify </button>
      </form>
    </div>
  )
}

export default VerifyEmail
