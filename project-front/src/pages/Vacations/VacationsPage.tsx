import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Edit, Favorite, FavoriteBorder, Delete } from '@mui/icons-material';
import { IconButton, CircularProgress, Box, Typography, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Vacation } from '../../types/vocation';
import './VacationsPage.css';
import { Button, Backdrop } from '@mui/material'; //
import { CalendarToday } from '@mui/icons-material';

type Props = {
    filter: string;
    page: number;
    setFilteredVacations: React.Dispatch<React.SetStateAction<Vacation[]>>;
    filteredVacations: Vacation[];
}

const VacationsPage = (props: Props) => {

    const [vacations, setVacations] = useState<Vacation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [vacationToDelete, setVacationToDelete] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const FALLBACK_IMAGE = '/path/to/fallback-image.jpg';

    useEffect(() => {
        const fetchVacations = async () => {
            try {
                const response = await axios.get('http://localhost:4091/vacations', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setVacations(response.data);
            } catch (err) {
                setError('Failed to fetch vacations.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setIsAdmin(decodedToken.isAdmin);
        }

        fetchVacations();
    }, []);

    useEffect(() => {
        let filtered = [...vacations];
        if (props.filter === 'following') {
            filtered = filtered.filter((vacation) => vacation.isFollowing === 1);
        } else if (props.filter === 'notStarted') {
            filtered = filtered.filter((vacation) => new Date(vacation.start_date) > new Date());
        } else if (props.filter === 'active') {
            filtered = filtered.filter(
                (vacation) => new Date(vacation.start_date) <= new Date() && new Date(vacation.end_date) >= new Date()
            );
        }
        props.setFilteredVacations(filtered);
    }, [vacations, props.filter]);

    const handleFollowToggle = async (vacationId: number) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const vacation = vacations.find((v) => v.vacation_id === vacationId);

                if (!vacation) {
                    console.log('Vacation not found.');
                    return;
                }

                const url = vacation.isFollowing
                    ? `http://localhost:4091/vacations/unfollow`
                    : `http://localhost:4091/vacations/follow`;

                const response = await axios.post(
                    url,
                    { vacationId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setVacations((prevVacations) =>
                    prevVacations.map((v) =>
                        v.vacation_id === vacationId
                            ? {
                                ...v,
                                isFollowing: vacation.isFollowing ? 0 : 1,
                                followers_count: vacation.isFollowing
                                    ? vacation.followers_count - 1
                                    : vacation.followers_count + 1,
                            }
                            : v
                    )
                );
            }
        } catch (error) {
            console.error('Failed to toggle follow status:', error);
        }
    };

    const openModal = (vacationId: number) => {
        setVacationToDelete(vacationId);
        setIsModalOpen(true);
        navigate(`/vacations`);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleEdit = (vacationId: number) => {
        console.log(vacationId);
        navigate(`/editVacations/${vacationId}`);

    };

    const deleteVacation = async () => {
        if (vacationToDelete === null) return;
    
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await axios.delete(`http://localhost:4091/vacation/delete/${vacationToDelete}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                setVacations(vacations.filter((vacation) => vacation.vacation_id !== vacationToDelete));
                closeModal();
    
                // נווט לעמוד הראשון של החופשות
                navigate(`/vacations`);
            }
    
        } catch (error) {
            console.error(error);
        }
    };
    

    const paginatedVacations = props.filteredVacations.slice((props.page - 1) * 10, props.page * 10);

    return (
        <div>
            {loading ? (
                <div className="loading-container">
                    <CircularProgress />
                </div>
            ) : (
                <div id='out-of-vacations'>
                    <div className="vacations-list">
                        {paginatedVacations.map((vacation) => (
                            <div key={vacation.vacation_id} className="vacation-card">
                                <div className="vacation-image-container">
                                    <img
                                        src={`http://localhost:4091/assets/${vacation.image_file_name}`}
                                        alt={vacation.destination}
                                        className="vacation-image"
                                        onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
                                    />
                                    <div className="image-overlay">
                                        {isAdmin ? (
                                            <>
                                                <Edit
                                                    className="overlay-icon edit-icon"
                                                    onClick={() => handleEdit(vacation.vacation_id)} // Corrected
                                                    sx={{
                                                        backgroundColor: "#ebf8fb",
                                                        color: 'rgb(151, 151, 151)',
                                                        borderRadius: "18px",
                                                        padding: "8px",
                                                        "&:hover": {
                                                            backgroundColor: "rgba(253, 185, 129, 0.8)",
                                                        },
                                                        opacity: 0.9,  // שקיפות לאייקון
                                                    }}
                                                />
                                                <Delete
                                                    className="overlay-icon delete-icon"
                                                    onClick={() => openModal(vacation.vacation_id)}
                                                    sx={{
                                                        backgroundColor: "#ebf8fb",
                                                        color: 'rgb(151, 151, 151)',
                                                        borderRadius: "18px",
                                                        padding: "8px",
                                                        "&:hover": {
                                                            backgroundColor: "rgba(253, 185, 129, 0.8)",
                                                        },
                                                        opacity: 0.9,  // שקיפות לאייקון
                                                    }}
                                                />
                                            </>
                                        ) : (
                                            <div className="follow-section">
                                                <IconButton
                                                    onClick={() => handleFollowToggle(vacation.vacation_id)}
                                                    sx={{
                                                        color: vacation.isFollowing
                                                            ? "rgba(253, 185, 129, 0.8)"
                                                            : "rgb(207, 207, 207)",
                                                    }}
                                                >
                                                    {vacation.isFollowing ? (
                                                        <Favorite
                                                            sx={{
                                                                color: "rgb(253, 185, 129)",
                                                                fontSize: 25,
                                                            }}
                                                        />
                                                    ) : (
                                                        <FavoriteBorder
                                                            sx={{
                                                                fontSize: 25,
                                                            }}
                                                        />
                                                    )}
                                                </IconButton>
                                                <span className="followers-count">
                                                    {vacation.followers_count} Followers
                                                </span>
                                            </div>

                                        )}
                                    </div>
                                    <div
                                        className="span-date"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: '10px', // להוריד את כל ה-div
                                        }}
                                    >
                                        <span style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginTop: '-5px', // להרים את ה-span
                                        }}>
                                            <CalendarToday
                                                sx={{
                                                    fontSize: 20,
                                                    marginRight: 1,
                                                    color: '#f6bb62',
                                                }}
                                            />
                                            <span>{new Date(vacation.start_date).toLocaleDateString()}</span>
                                            <span> - </span>
                                            <span>{new Date(vacation.end_date).toLocaleDateString()}</span>
                                        </span>
                                    </div>



                                </div>
                                <h2>{vacation.destination}</h2>
                                <p>{vacation.description}</p>
                                <p className="price">${vacation.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <Modal
                open={isModalOpen}
                onClose={closeModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '12px',
                    }}
                >
                    <Typography id="modal-title" variant="h5" component="h2" gutterBottom>
                        Are you sure you want to delete this vacation?
                    </Typography>

                    {vacationToDelete && (
                        <Typography id="modal-description" variant="body1" sx={{ mt: 2 }}>
                            Vacation Details:
                            <ul>
                                <li>
                                    <strong>Vacation ID:</strong> {vacationToDelete}
                                </li>
                                <li>
                                    <strong>Name:</strong>{' '}
                                    {vacations.find((vacation) => vacation.vacation_id === vacationToDelete)?.destination}
                                </li>
                                <li>
                                    <strong>Location:</strong>{' '}
                                    {vacations.find((vacation) => vacation.vacation_id === vacationToDelete)?.description}
                                </li>
                            </ul>
                        </Typography>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                        <Button
                            variant="contained"
                            onClick={deleteVacation}
                            sx={{ padding: '10px 20px', fontSize: '16px', color: '#ebf8fb', backgroundColor: '#f6bb62' }}
                        >
                            Yes, Delete Vacation
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={closeModal}
                            sx={{ padding: '10px 20px', fontSize: '16px', color: '#f6bb62', backgroundColor: '#ebf8fb', border: 'none' }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default VacationsPage;
