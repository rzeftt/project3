import React, { useState } from 'react';
import {
    Favorite,
    FavoriteBorder,
    CalendarToday,
    CalendarTodayOutlined,
    Search,
    SearchOutlined,
    Add,
    BarChart,
} from '@mui/icons-material';
import { ButtonGroup, Stack, Pagination, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './filtersPgination.css';
import { Vacation } from '../../types/vocation';

type Props = {
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    filteredVacations: Vacation[];
    isAdmin: boolean;
};

const FiltersPagination: React.FC<Props> = (props) => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState<string>(props.filter);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        props.setPage(value);
    };

    const toggleFilter = (filterType: string) => {
        const newFilter = props.filter === filterType ? 'all' : filterType;
        props.setFilter(newFilter);
        setActiveFilter(newFilter);
        props.setPage(1); // איפוס העמוד לפילטור חדש
    };

    const handleAddVacation = () => {
        navigate('/addVacation');
    };

    const handleViewReports = () => {
        navigate('/vacations-report');
    };

    return (
        <div className="filter-buttons">
            <div id='left-group'>
                {props.isAdmin ? (
                    <ButtonGroup>
                        <IconButton
                            color="primary"
                            onClick={handleAddVacation}
                            size="small"
                            sx={{
                                border: '2px solid rgb(253, 185, 129)',
                                color: 'rgb(200, 200, 200)',
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    color: 'rgb(253, 185, 129)',
                                },
                            }}
                        >
                            <Add />
                        </IconButton>
                        <IconButton
                            color="primary"
                            onClick={handleViewReports}
                            size="small"
                            sx={{
                                border: '2px solid rgb(253, 185, 129)',
                                color: 'rgb(200, 200, 200)',
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    color: 'rgb(253, 185, 129)',
                                },
                            }}
                        >
                            <BarChart />
                        </IconButton>
                    </ButtonGroup>
                ) : (
                    <ButtonGroup>
                        <IconButton
                            onClick={() => toggleFilter('following')}
                            sx={{
                                border: '2px solid rgb(253, 185, 129)',
                                color: activeFilter === 'following' ? 'rgb(253, 185, 129)' : 'rgb(200, 200, 200)',
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    color: 'rgb(253, 185, 129)',
                                },
                            }}
                        >
                            {activeFilter === 'following' ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>
                        <IconButton
                            onClick={() => toggleFilter('notStarted')}
                            sx={{
                                border: '2px solid rgb(253, 185, 129)',
                                color: activeFilter === 'notStarted' ? 'rgb(253, 185, 129)' : 'rgb(200, 200, 200)',
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    color: 'rgb(253, 185, 129)',
                                },
                            }}
                        >
                            {activeFilter === 'notStarted' ? <CalendarToday /> : <CalendarTodayOutlined />}
                        </IconButton>
                        <IconButton
                            onClick={() => toggleFilter('active')}
                            sx={{
                                border: '2px solid rgb(253, 185, 129)',
                                color: activeFilter === 'active' ? 'rgb(253, 185, 129)' : 'rgb(200, 200, 200)',
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    color: 'rgb(253, 185, 129)',
                                },
                            }}
                        >
                            {activeFilter === 'active' ? <Search /> : <SearchOutlined />}
                        </IconButton>
                    </ButtonGroup>
                )}
            </div>
            <div id='right-group'>
                <Pagination
                    count={Math.ceil(props.filteredVacations.length / 10)}
                    page={props.page}
                    onChange={handlePageChange}
                    shape="rounded"
                    size="medium"
                    sx={{
                        "& .MuiPaginationItem-root": {
                            borderRadius: "50%",
                            color: "rgb(200, 200, 200)",
                            border: "2px solid rgb(253, 185, 129)",
                            backgroundColor: "transparent",
                        },
                        "& .MuiPaginationItem-root.Mui-selected": {
                            backgroundColor: "transparent",
                            color: "rgb(200, 200, 200)",
                            border: "2px solid rgb(253, 185, 129)",
                        },
                        "& .MuiPaginationItem-previousNext": {
                            backgroundColor: "transparent",
                            color: "rgb(200, 200, 200)",
                            border: "none",
                        },

                    }}
                />
            </div>
        </div>
    );
};

export default FiltersPagination;
