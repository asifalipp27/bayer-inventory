import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [issubmitError, setIsSubmitError] = useState(false);

  const validate = () => {
    let errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
        const url = 'http://localhost:5000/api/auth/login';
        const data = {
        email: email,
        password:password
        };

        fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        sessionStorage.setItem("token", data.data.token);
        setIsSubmitError(false);
        setSubmitError("");
        })
        .catch((error) => {
            setIsSubmitError(true);
            console.error('Error:', error);
            setSubmitError(error);
        });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {issubmitError && <p className="error">{submitError}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
         Don't have an account? <Link to="/signup">Signup here</Link>
      </p>
    </div>
  );
}

export default Login;
