import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [credentials, setCredentials] = useState({email: "", password: ""});
    let history = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/auth/login', {
            method:"POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })
        })
        const json = await response.json();
        console.log(json)
        if(json.success){
            localStorage.setItem('token', json.authToken)
            console.log(localStorage.getItem('token'))
            history('/')
        }
        else{
            alert("Invalid credentials")
        }
    }

    const handleChange = (e)=>{
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

  return (

    <div className="container w-50">
      <form onSubmit={handleSubmit} >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
