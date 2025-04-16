import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');
    const [issubmitError, setIsSubmitError] = useState(false);

    const validate = () => {
        let errors = {};
        if (!name) {
            errors.name = 'Name is required';
        }
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
        if (!role) {
            errors.role = 'Role is required';
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            const url = 'http://localhost:5000/api/auth/register';
                const data = {
                name: name,
                email: email,
                password:password,
                role: role,
                is_active: true,
                created_at : new Date()
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
        <div className="signup-container">
            <h2>Signup</h2>
            {issubmitError && <p className="error">{submitError}</p>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>
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
                <div className="form-group">
                    <label>Role:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="">Select Role</option>
                        <option value="pharasist">Pharasist</option>
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                    </select>
                    {errors.role && <p className="error">{errors.role}</p>}
                </div>
                <button type="submit">Signup</button>
            </form>
            <p>
                Already have an account? <Link to="/">Login here</Link>
            </p>

        </div>
    );
}

export default Signup;
