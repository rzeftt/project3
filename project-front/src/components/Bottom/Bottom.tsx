import React from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import CopyrightIcon from '@mui/icons-material/Copyright';

import './Bottom.css'; // ייבוא קובץ העיצוב

const Bottom: React.FC = () => {
    const navigate = useNavigate();

    // פונקציה לפתיחת ג'ימייל עם כתובת המייל שלך
    const openEmailApp = () => {
        const email = 'rz0527631024@gmail.com';
        window.location.href = `mailto:${email}`;
    };

    return (
        <nav className="bottom-nav">
            {/* כפתור לחזור אחורה */}
            <IconButton
                onClick={() => navigate(-1)} // חזור אחורה
                aria-label="חזור אחורה"
                className="custom-icon-button rotate-left"
                sx={{
                    marginRight: '20px',
                    fontSize: '1.5rem', // הקטנה של האיקון
                }}
            >
                <IosShareIcon />
            </IconButton>

            {/* כפתור לעבור קדימה */}
            <IconButton
                onClick={() => navigate(1)} // עבור קדימה
                aria-label="עבור קדימה"
                className="custom-icon-button rotate-right"
                sx={{
                    marginRight: '250px',
                    fontSize: '1.5rem', // הקטנה של האיקון
                }}
            >
                <IosShareIcon />
            </IconButton>

            {/* כיתוב בצד שמאל עם האיקונים */}
            <span className="span-bottom">
                <CopyrightIcon sx={{ fontSize: '1.5rem', marginRight: '6px' }} />
                <PersonIcon sx={{ fontSize: '1.0rem', marginRight: '6px' }} />
                Raizy-Finkelsthein
                {/* כפתור שיעביר לג'ימייל */}
                <EmailIcon 
                    sx={{ fontSize: '1.0rem', marginLeft: '12px', marginRight: '8px' }} 
                    onClick={openEmailApp} 
                    style={{ cursor: 'pointer' }} 
                />
                rz0527631024@gmail.com
            </span>
        </nav>
    );
};

export default Bottom;
