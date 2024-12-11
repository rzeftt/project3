import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material'; 
import './RegisterPage.css'; 

interface RegisterPageProps {
    setUserName: React.Dispatch<React.SetStateAction<string | null>>;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ setUserName }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:4091/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Save the JWT token
                localStorage.setItem("token", data.token);
                setUserName(`${firstName} ${lastName}`);

                setEmail("");
                setPassword("");
                setFirstName("");
                setLastName("");
                setErrorMessage("");
                navigate('/vacations');
            } else {
                setErrorMessage(data.message || "Registration failed");
                // Clear error message after 1.5 seconds
                setTimeout(() => setErrorMessage(''), 1500);
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again.");
            setTimeout(() => setErrorMessage(''), 1500);
        }
    };

    return (
        <div className="containerRegister">
            <Card className="cardRegister">
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Register
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            margin="normal"
                        />
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            margin="normal"
                        />
                        <Button 
                            variant="contained" 
                            color="primary" 
                            type="submit" 
                            fullWidth
                            sx={{ mt: 2 , backgroundColor: '#f6bb62'}}
                        >
                            Register
                        </Button>
                    </form>
                    {errorMessage && (
                        <Typography variant="body2"  sx={{ mt: 2 }} className='errorMessage'>
                            {errorMessage}
                        </Typography>
                    )}
                    <p className="register" style={{ textAlign: 'center', marginTop: '1rem' }}>
                        Already registered? <Link to="/login" className='login-link'>Login here</Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default RegisterPage;
