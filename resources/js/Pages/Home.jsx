import React from 'react';
import { Grid, Container, Typography, Box } from '@mui/material';
import headerImage from '../../assets/images/home-page-header.png';
import Navbar from "@/Components/Navbar.jsx";
import Footer from "@/Components/Footer.jsx";

const Home = () => {
    return (
        <>
            {/* Меню бар */}
            <Navbar />
            {/* Контент */}
            <Box
                sx={{
                    minHeight: '100vh',
                    background: 'linear-gradient(to bottom, #140648, #332754, #443455)',
                    color: 'white',
                    padding: '2rem 0'
                }}
            >
                {/* Верхній блок */}
                <Container>
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h3" component="h1" gutterBottom>
                                Вітаємо на нашому сайті – вашому порталі до нових горизонтів!
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.6, color: '#bcbcc4', paddingTop: '12px' }}>
                                Фільми, що розкажуть неймовірні історії та перенесуть вас у світ фантазії.
                                Погода, яка допоможе спланувати ваш день, незалежно від того, де ви знаходитесь.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box
                                component="img"
                                src={headerImage}
                                alt="Welcome Illustration"
                                sx={{
                                    width: '100%',
                                    borderRadius: '10px',
                                    maxHeight: '480px',
                                    maxWidth: '480px'
                                }}
                            />
                        </Grid>
                    </Grid>
                </Container>

                {/* Опис можливостей */}
                <Container sx={{ marginTop: '4rem' }}>
                    <Grid container spacing={4}>
                        {[
                            {
                                title: 'Фільми',
                                description: 'Неймовірний вибір фільмів для кожного смаку, від класики до сучасних блокбастерів.',
                            },
                            {
                                title: 'Погода',
                                description: 'Детальний прогноз погоди, який допоможе вам планувати свій день.',
                            },
                            {
                                title: 'Інтерактивність',
                                description: 'Зручний інтерфейс та інструменти, які зроблять ваш досвід приємним і продуктивним.',
                            },
                        ].map((feature, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Box
                                    sx={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        padding: '1.5rem',
                                        borderRadius: '8px',
                                        textAlign: 'center',
                                        transition: 'transform 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            background: 'rgba(255, 255, 255, 0.2)',
                                        },
                                    }}
                                >
                                    <Typography variant="h5" gutterBottom>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body1">
                                        {feature.description}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>

                {/* Футер */}
                <Footer/>
            </Box>
        </>
    );
};

export default Home;
