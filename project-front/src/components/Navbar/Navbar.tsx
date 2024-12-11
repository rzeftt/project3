import React, { useState } from 'react';
import './Navbar.css';
import { ExitToApp, Home, PersonOutline } from '@mui/icons-material'; // אייקון יציאה, בית ואיקון משתמש אנונימי
import { IconButton } from '@mui/material'; // כפתור לחיץ
import { useNavigate } from 'react-router-dom'; // ניווט בין דפים

interface NavbarProps {
    userName: string | null;
    isAdmin: boolean;
    onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ userName, isAdmin, onLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const getInitials = (name: string | null) => {
        if (!name) return '';
        const parts = name.split(' ');
        return parts.map((part) => part[0]?.toUpperCase()).join('');
    };

    const handleUserCircleClick = () => {
        // לוגיקת יציאה עבור כל המשתמשים
        localStorage.removeItem('authToken');
        onLogout();
        navigate('/login'); // מעבר לדף התחברות אחרי יציאה
    };

    const handleHomeClick = () => {
        if (isAdmin) {
            navigate('/admin-vacations'); // עמוד החופשות של האדמין
        } else {
            navigate('/vacations'); // עמוד החופשות הכללי
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <div id='user-name-div' >
                    {/* עיגול המשתמש או אייקון אנונימי */}
                    <div className="user-circle me-3" onClick={handleUserCircleClick}>
                        {userName ? getInitials(userName) : <PersonOutline sx={{ fontSize: 30 }} />} {/* אייקון אנונימי במקרה שאין שם משתמש */}
                    </div>

                    {/* כיתוב ברוך הבא */}
                    <div className="welcome-text">
                        {userName ? `Welcome, ${userName}` : "Welcome, Guest"}
                    </div>

                    {/* כפתור יציאה - מוצג לכולם */}
                    {userName && isMenuOpen && (
                        <div className="dropdown-menu">
                            <IconButton color="secondary" onClick={handleUserCircleClick}>
                                <ExitToApp /> {/* אייקון יציאה */}
                            </IconButton>
                        </div>
                    )}
                </div>

                {/* כפתור הבית בצד שמאל */}
                {/* <div className="home-button-container">
                    <IconButton
                        onClick={handleHomeClick}
                        sx={{
                            color: 'rgb(200, 200, 200)', // צבע האייקון
                        }}
                    >
                        <Home
                            sx={{
                                fontSize: '50px', // גודל האייקון
                                strokeWidth: 1, // הגדרת עובי הקו
                                fill: 'none', // מבטל את הצבע הפנימי של האייקון
                                stroke: 'currentColor', // קובע את צבע הקו לצבע שנבחר
                            }}
                        />
                    </IconButton>
                </div> */}
            </div>
        </nav>
    );
};

export default Navbar;
