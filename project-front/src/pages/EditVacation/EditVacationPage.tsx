import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Vacation } from '../../types/vocation';
import { Box, Button, TextField, Typography, CircularProgress, Alert } from '@mui/material';
import './EditVacationPage.css';  
const EditVacation = () => {
    const navigate = useNavigate();
    const { vacationId } = useParams();
    const [formData, setFormData] = useState<Vacation>({
        vacation_id: 0,
        destination: '',
        description: '',
        start_date: '',
        end_date: '',
        isFollowing: 0,
        followers_count: 0,
        image_file_name: '',
        price: 0,
    });
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const [newImage, setNewImage] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const loadVacation = async () => {
            try {
                const response = await fetch(`http://localhost:4091/vacations/${vacationId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch vacation details.');
                }

                const vacationData = await response.json();
                setFormData(vacationData);
                if (vacationData.image_file_name) {
                    setCurrentImage(`http://localhost:4091/assets/${vacationData.image_file_name}`);
                }
                setLoading(false);
            } catch (err: any) {
                setErrorMessage(err.message);
                setLoading(false);
            }
        };

        if (vacationId) {
            loadVacation();
        }
    }, [vacationId]);

    const FALLBACK_IMAGE = '/path/to/fallback-image.jpg';

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const offset = date.getTimezoneOffset();
        date.setMinutes(date.getMinutes() - offset);
        return date.toISOString().split('T')[0];
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setNewImage(e.target.files[0]);
            setCurrentImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.price < 0 || formData.price > 10000) {
            setErrorMessage("The price must be between 0 and 10,000.");
            return;
        }

        if (new Date(formData.end_date) < new Date(formData.start_date)) {
            setErrorMessage("End date cannot be earlier than start date.");
            return;
        }

        try {
            const formDataToSend = new FormData();

            formDataToSend.append('destination', formData.destination);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('start_date', formData.start_date);
            formDataToSend.append('end_date', formData.end_date);
            formDataToSend.append('price', formData.price.toString());

            if (newImage) {
                formDataToSend.append('image_file', newImage);
            } else if (formData.image_file_name) {
                formDataToSend.append('image_file_name', formData.image_file_name);
            }

            const response = await fetch(`http://localhost:4091/editVacations/${vacationId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: formDataToSend,
            });

            if (!response.ok) {
                throw new Error('Failed to update vacation.');
            }

            navigate(`/vacations`);
        } catch (err: any) {
            setErrorMessage(err.message);
        }
    };

    if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;

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
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    sx={{ height: 60 }}
                />
                <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    sx={{ height: 60 }}
                />
                <TextField
                    label="Start Date"
                    name="start_date"
                    type="date"
                    value={formatDate(formData.start_date)}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    sx={{ height: 60 }}
                />
                <TextField
                    label="End Date"
                    name="end_date"
                    type="date"
                    value={formatDate(formData.end_date)}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    sx={{ height: 60 }}
                />
                <TextField
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
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

                {currentImage && <Box component="img" src={currentImage} alt="Vacation" sx={{ width: '100%', marginTop: 2, borderRadius: 1 }} />}
                {!currentImage && !newImage && <Box component="img" src={FALLBACK_IMAGE} alt="Fallback" sx={{ width: '100%', marginTop: 2, borderRadius: 1 }} />}

                <Button type="submit" variant="contained" fullWidth
                    sx={{ marginTop: 3, backgroundColor: '#f5fcfd', border: 'none', color: '#f6bb62' ,boxShadow:'none'}}
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

export default EditVacation;
