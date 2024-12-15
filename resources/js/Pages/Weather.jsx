import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Container,
    Grid,
    Typography,
    Autocomplete,
    TextField,
    CircularProgress,
} from '@mui/material';
import Navbar from '@/Components/Navbar.jsx';
import Footer from '@/Components/Footer.jsx';
import axios from 'axios';
import {WiDaySunny, WiRain, WiCloud, WiWindy, WiSnow, WiThunderstorm, WiFog, WiNightClear} from 'react-icons/wi';

const Weather = () => {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [country, setCountry] = useState(null);
    const [city, setCity] = useState(null);
    const [weatherToday, setWeatherToday] = useState(null);
    const [weatherWeek, setWeatherWeek] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('/api/countries');
                setCountries(response.data);
            } catch (error) {
                console.error('Помилка завантаження країн:', error);
                setError('Не вдалося завантажити список країн.');
            }
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        if (!country) return;

        const fetchCities = async () => {
            try {
                const response = await axios.get(`/api/countries/${country.code}/cities`);
                setCities(response.data);
            } catch (error) {
                console.error('Помилка завантаження міст:', error);
                setError('Не вдалося завантажити міста для цієї країни.');
            }
        };

        fetchCities();
    }, [country]);

    const fetchWeather = async () => {
        if (!city) return;

        setLoading(true);
        setError(null);

        try {
            const responseToday = await axios.get(`/api/weather/${city.name}`);
            setWeatherToday(responseToday.data);

            const responseWeek = await axios.get(`/api/weather/${city.name}/week`);
            setWeatherWeek(responseWeek.data);
        } catch (error) {
            console.error('Помилка завантаження погоди:', error);
            setError('Не вдалося завантажити дані погоди.');
        } finally {
            setLoading(false);
        }
    };

    const weatherIcons = {
        'чисте небо': <WiDaySunny size={40} />,
        'легкий дощ': <WiRain size={40} />,
        'уривчасті хмари': <WiCloud size={40} />,
        'помірний дощ': <WiRain size={40} />,
        'чисте небо вночі': <WiNightClear size={40} />,
        'сніг': <WiSnow size={40} />,
        'легкий сніг': <WiSnow size={40} />,
        'вітряно': <WiWindy size={40} />,
        'кілька хмар': <WiCloud size={40} />,
        'туман': <WiFog size={40} />,
        'шторми': <WiThunderstorm size={40} />,

    };

    const getWeatherIcon = (condition) => {
        return weatherIcons[condition] || <WiCloud size={40} />;
    };

    return (
        <>
            {/* Меню бар */}
            <Navbar />

            {/* Контент */}
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'linear-gradient(to bottom, #140648, #332754, #443455)',
                    color: 'white',
                }}
            >
                {/* Головна секція */}
                <Container sx={{ flex: 1, padding: '2rem 0' }}>
                    <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
                        Погода у вашому регіоні
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: 'center', color: '#bcbcc4', marginBottom: '3rem' }}>
                        Введіть назву міста та країни, щоб дізнатися прогноз погоди на сьогодні або на весь тиждень.
                    </Typography>

                    <Grid container spacing={4} justifyContent="center">
                        {/* Вибір країни */}
                        <Grid item xs={12} sm={6} md={4}>
                            <Autocomplete
                                value={country}
                                onChange={(event, newValue) => setCountry(newValue)}
                                options={countries}
                                getOptionLabel={(option) => (option && option.name) || ''}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Країна"
                                        variant="outlined"
                                        sx={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            color: 'white',
                                            borderRadius: '8px',
                                            '& .MuiInputBase-input': {
                                                color: 'white',
                                            },
                                        }}
                                        InputLabelProps={{
                                            sx: {
                                                color: 'rgba(255, 255, 255, 0.7)',
                                                '&.Mui-focused': {
                                                    color: 'white',
                                                },
                                            },
                                        }}
                                    />
                                )}
                            />
                        </Grid>

                        {/* Вибір міста */}
                        <Grid item xs={12} sm={6} md={4}>
                            <Autocomplete
                                value={city}
                                onChange={(event, newValue) => setCity(newValue)}
                                options={cities}
                                getOptionLabel={(option) => (option && option.name) || ''}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Місто"
                                        variant="outlined"
                                        sx={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            color: 'white',
                                            borderRadius: '8px',
                                            '& .MuiInputBase-input': {
                                                color: 'white',
                                            },
                                        }}
                                        InputLabelProps={{
                                            sx: {
                                                color: 'rgba(255, 255, 255, 0.7)',
                                                '&.Mui-focused': {
                                                    color: 'white',
                                                },
                                            },
                                        }}
                                    />
                                )}
                            />
                        </Grid>

                        {/* Кнопка пошуку */}
                        <Grid item xs={12} sm={6} md={2} textAlign="center">
                            <Button
                                variant="contained"
                                onClick={fetchWeather}
                                sx={{
                                    background: 'linear-gradient(to right, #6b1dcf, #9a4dff)',
                                    color: 'white',
                                    borderRadius: '8px',
                                    padding: '0.5rem 2rem',
                                    '&:hover': {
                                        background: 'linear-gradient(to right, #9a4dff, #6b1dcf)',
                                    },
                                }}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Пошук'}
                            </Button>
                        </Grid>
                    </Grid>
                </Container>

                {/* Результати пошуку */}
                <Container sx={{ marginTop: '2rem' }}>
                    {error && (
                        <Typography variant="body1" sx={{ textAlign: 'center', color: 'red', marginBottom: '2rem' }}>
                            {error}
                        </Typography>
                    )}

                    {(!country || !city) && !error && (
                        <Typography variant="body1" sx={{ textAlign: 'center', color: '#bcbcc4', marginBottom: '2rem' }}>
                            Оберіть країну та місто, щоб отримати прогноз погоди.
                        </Typography>
                    )}

                    {/* Прогноз на сьогодні */}
                    {weatherToday && (
                        <Grid container spacing={4} sx={{justifyContent: 'center'}}>
                            <Grid item xs={12} md={6}>
                                <Box
                                    sx={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        padding: '2rem',
                                        borderRadius: '8px',
                                        textAlign: 'center',
                                    }}
                                >
                                    {getWeatherIcon(weatherToday.description)}
                                    <Typography variant="h5" gutterBottom sx={{ marginTop: '1rem' }}>
                                        Погода на сьогодні
                                    </Typography>
                                    <Typography variant="body1">
                                        {weatherToday.description}
                                    </Typography>
                                    <Typography variant="h6">
                                        {weatherToday.temperature}°C
                                    </Typography>
                                </Box>
                            </Grid>

                            {/* Прогноз на тиждень */}
                            <Grid item xs={12}>
                                <Typography variant="h5" sx={{ marginBottom: '1rem', textAlign: 'center' }}>
                                    Прогноз на тиждень
                                </Typography>
                                <Grid container spacing={2} justifyContent="center">
                                    {weatherWeek.map((day, index) => (
                                        <Grid item key={index} xs={12} sm={6} md={3} sx={{ textAlign: 'center' }}>
                                            <Box
                                                sx={{
                                                    background: 'rgba(255, 255, 255, 0.1)',
                                                    padding: '1rem',
                                                    borderRadius: '8px',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                {getWeatherIcon(day.description)}
                                                <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
                                                    {day.date}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {day.description}
                                                </Typography>
                                                <Typography variant="h6">{day.temperature}°C</Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Container>

                {/* Футер */}
                <Footer sx={{ marginTop: 'auto' }} />
            </Box>
        </>
    );
};

export default Weather;
