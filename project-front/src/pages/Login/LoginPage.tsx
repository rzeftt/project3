import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material'; 
import './Login.css';
import jwtDecode from 'jwt-decode';

const LoginPage: React.FC<{ 
    setUserName: React.Dispatch<React.SetStateAction<string | null>>, 
    setIsAdmin: React.Dispatch<React.SetStateAction<boolean>> 
}> = ({ setUserName, setIsAdmin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setEmail(value);
    };

    const validateEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        setIsLoading(true);

        if (!validateEmail(email)) {
            setIsLoading(false);
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        if (password.length < 4) {
            setIsLoading(false);
            setErrorMessage('Password must be at least 4 characters long.');
            return;
        }

        try {
            const response = await fetch('http://localhost:4091/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const responseData = await response.json();
            setIsLoading(false);

            if (!response.ok) {
                setErrorMessage(responseData.message || 'Invalid login credentials.');
                return;
            }

            if (responseData.token) {
                localStorage.setItem('token', responseData.token);
                const decodedToken: any = jwtDecode(responseData.token);

                const firstName = decodedToken.firstName || 'Not Provided';
                const lastName = decodedToken.lastName || 'Not Provided';
                setUserName(`${firstName} ${lastName}`);

                const isAdmin = decodedToken.isAdmin === true;
                setIsAdmin(isAdmin);

                setEmail('');
                setPassword('');

                navigate('/vacations');
            } else {
                setErrorMessage('Token is undefined');
            }
        } catch (error) {
            setIsLoading(false);
            setErrorMessage('Unexpected error. Please try again later.');
        }
    };

    return (
        <div className="containerLogin">
            <Card className="cardLogin">
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            type="email"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={email}
                            onChange={handleEmailChange}
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
                            sx={{ mt: 2 ,backgroundColor: '#f6bb62'}}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </Button>
                    </form>
                    {errorMessage && (
                        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                            {errorMessage}
                        </Typography>
                    )}
                    <p className="register" style={{ textAlign: 'center', marginTop: '1rem' }}>
                        Not registered? <Link to="/register" className='register-link'> Register here</Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginPage;
