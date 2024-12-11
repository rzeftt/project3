import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Navbar from './components/Navbar/Navbar';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import VacationsPage from './pages/Vacations/VacationsPage';
import FiltersPagination from './pages/FiltersPgination/filtersPagination';
import { Vacation } from './types/vocation';
import './App.css';
import AddVacationPage from './pages/AddVacation/AddVacationPage';
import EditVacation from './pages/EditVacation/EditVacationPage';
import VacationReport from './pages/VacationReport/VacationReport';
import Bottom from './components/Bottom/Bottom';



interface DecodedToken {
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    exp: number;
}

const App: React.FC = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>('all');
    const [page, setPage] = useState<number>(1);
    const [filteredVacations, setFilteredVacations] = useState<Vacation[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const userData: DecodedToken = jwtDecode(token);
                if (!userData.firstName || !userData.lastName) {
                    throw new Error('Invalid token structure');
                }
                setUserName(`${userData.firstName} ${userData.lastName}`);
                setIsAdmin(userData.isAdmin || false);
                navigate('/vacations');
            } catch (error) {
                console.error('Invalid token:', error);
                onLogout();
            }
        }
    }, []);

    const onLogout = () => {
        setUserName(null);
        setIsAdmin(false);
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div id='body'>
            <header>
                <Navbar userName={userName} isAdmin={isAdmin} onLogout={onLogout} />
            </header>

            <main>
                <Routes>
                    <Route path="/login" element={<LoginPage setUserName={setUserName} setIsAdmin={setIsAdmin} />} />
                    <Route path="/register" element={<RegisterPage setUserName={setUserName} />} />
                    <Route
                        path="/vacations"
                        element={
                            userName ? (
                                <>
                                    <FiltersPagination
                                        filter={filter}
                                        setFilter={setFilter}
                                        page={page}
                                        setPage={setPage}
                                        filteredVacations={filteredVacations}
                                        isAdmin={isAdmin}
                                    />
                                    <VacationsPage
                                        filter={filter}
                                        page={page}
                                        setFilteredVacations={setFilteredVacations}
                                        filteredVacations={filteredVacations}
                                    />
                                </>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/addVacation"
                        element={isAdmin ? <AddVacationPage /> : <Navigate to="/vacations" />}
                    />
                    <Route path="/editVacations/:vacationId" element={<EditVacation />} /> {/* נתיב לעריכת חופשה */}
                    <Route path="/vacations/:id" element={<EditVacation />} />
                    <Route path="vacations-report" element={<VacationReport />} />

                </Routes>

            </main>

            <footer>
                <Bottom />
            </footer>
        </div>
    );
};

export default App;
