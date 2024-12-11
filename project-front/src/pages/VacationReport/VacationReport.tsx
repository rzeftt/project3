import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import './VacationReport.css'; // ייבוא קובץ העיצוב

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Vacation {
    destination: string;
    followers_count: number;
}

const VacationReport: React.FC = () => {
    const [vacations, setVacations] = useState<Vacation[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchVacations = async () => {
            try {
                console.log('Fetching vacation report...');
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found. Please log in again.');
                }

                const response = await fetch('http://localhost:4091/vacations-report', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Vacation data received:', data);
                setVacations(data);
            } catch (err: any) {
                console.error('Error fetching data:', err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVacations();
    }, []);

    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error: {error}</div>;

    if (vacations.length === 0) {
        return <div>No vacation data available.</div>;
    }

    const chartData = {
        labels: vacations.map((vacation) => vacation.destination),
        datasets: [
            {
                data: vacations.map((vacation) => vacation.followers_count),
                backgroundColor: 'rgb(253, 185, 129)', // צבע הפסים
                borderColor: 'rgb(253, 185, 129)', // צבע הגבול
                borderWidth: 1,
                barThickness: 28, // עובי הפסים
            
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Vacation Report - Followers Count',
            },
        },
        scales: {
            y: {
                ticks: {
                    stepSize: 1, // מגדיר מרווחים של 1 בין כל ערך
                    callback: function (value: string | number) {
                        return Number.isInteger(value) ? value : ''; // מציג רק מספרים שלמים
                    },
                },
            },
        },
    };

    const downloadCSV = () => {
        const headers = ['Destination', 'Followers Count'];
        const rows = vacations.map((vacation) => [vacation.destination, vacation.followers_count]);

        const csvContent = [
            headers.join(','),
            ...rows.map((row) => row.join(',')),
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', 'vacations_report.csv');
        link.click();

        URL.revokeObjectURL(url);
    };

    return (
        <div className="vacation-report-container">
            <button className="download-button" onClick={downloadCSV}>
                <i className="material-icons">arrow_downward</i>
            </button>
            
            <div className="chart-container">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default VacationReport;
