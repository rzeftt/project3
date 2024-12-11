import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
} from '@mui/material';
import './AddVacationPage.css';

const AddVacationPage: React.FC = () => {
    const [destination, setDestination] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number>(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null); 
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setImage(file);
        
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        setIsLoading(true);

        if (!destination || !description || !price || !startDate || !endDate || !image) {
            setErrorMessage('All fields are required, including the image!');
            setIsLoading(false);
            return;
        }

        if (price < 0 || price > 10000) {
            setErrorMessage('Price must be between 0 and 10,000.');
            setIsLoading(false);
            return;
        }

        const startDateObject = new Date(startDate);
        const endDateObject = new Date(endDate);
        const currentDate = new Date();

        if (startDateObject < currentDate) {
            setErrorMessage('Start date cannot be in the past.');
            setIsLoading(false);
            return;
        }

        if (endDateObject < currentDate) {
            setErrorMessage('End date cannot be in the past.');
            setIsLoading(false);
            return;
        }

        if (startDateObject > endDateObject) {
            setErrorMessage('End date must be after start date.');
            setIsLoading(false);
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setErrorMessage('User is not authenticated');
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('destination', destination);
        formData.append('description', description);
        formData.append('price', price.toString());
        formData.append('start_date', startDate);
        formData.append('end_date', endDate);

        if (image) {
            formData.append('image', image);
        } else {
            setErrorMessage('Image is required!');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:4091/addVacation', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const responseData = await response.json();
            setIsLoading(false);

            if (!response.ok) {
                setErrorMessage(responseData.message || 'Error adding vacation');
                return;
            }

            navigate('/vacations');
        } catch (error) {
            setIsLoading(false);
            setErrorMessage('Unexpected error. Please try again later.');
            console.error('Error:', error);
        }
    };

    return (
        <Box>
            {errorMessage && (
                <div className="errorMessage">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ width: '100%' }} className='form-container'>
                <TextField
                    label="Destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                    sx={{ height: 60 }}
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                    sx={{ height: 60 }}
                />
                <TextField
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    sx={{ height: 60 }}
                />
                <TextField
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    sx={{ height: 60 }}
                />
                <TextField
                    label="Price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    fullWidth
                    required
                    margin="normal"
                    sx={{ height: 60 }}
                />
                <TextField
                    label="Upload Image"
                    name="image"
                    type="file"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ accept: "image/*" }}
                    onChange={handleImageChange}
                />
                {imagePreview && (
                    <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                        <Typography variant="subtitle1"></Typography>
                        <img
                            src={imagePreview}
                            alt="Preview"
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                                borderRadius: '8px',
                            }}
                        />
                    </Box>
                )}

                <Button type="submit" variant="contained" fullWidth
                    sx={{ marginTop: 3, backgroundColor: '#f5fcfd', border: 'none', color: '#f6bb62', boxShadow: 'none' }}
                >
                    Save Changes
                </Button>

                <Button className='cancel-button'
                    variant="outlined"
                    fullWidth
                    sx={{ marginTop: 2, backgroundColor: '#f6bb62', border: 'none', color: '#f5fcfd' }}
                    onClick={() => navigate('/vacations')}
                >
                    Cancel
                </Button>
            </form>
        </Box>
    );
};

export default AddVacationPage;
