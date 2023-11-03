import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const [credentials, setCredentials] = useState({name: "", email: "", password: "" });
  let history = useNavigate();

  // Method to Create a New user if Credentials are correct
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/auth/createUser", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    
    // Pushing returned token to localstorage if signup was successful
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      history("/");
    } else {
      if(json.errors){
        alert(json.errors[json.errors.length-1].msg);
      }
      else{
        alert(json.error)
      }
    }
  };

  // Method to sense changes in input  tag
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container w-50">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            onChange={handleChange}
            type="text"
            className="form-control"
            name="name"
            id="name"
            aria-describedby="emailHelp"
            required
          />
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            onChange={handleChange}
            type="email"
            className="form-control"
            name="email"
            id="email"
            aria-describedby="emailHelp"
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={handleChange}
            type="password"
            className="form-control"
            name="password"
            id="password"
            autoComplete="current-password"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            onChange={handleChange}
            type="password"
            className="form-control"
            name="cpassword"
            id="cpassword"
            autoComplete="current-password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
