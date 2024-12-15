import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Card, CardContent, CardMedia, Container, Grid, TextField, Typography } from "@mui/material";
import Navbar from "@/Components/Navbar.jsx";
import Footer from "@/Components/Footer.jsx";

const Movies = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        setError(null);
        try {
            const response = await axios.get(`/api/movies/${searchTerm}`);
            if (response.data) {
                setMovie(response.data);
            } else {
                setMovie(null);
                setError("Фільм не знайдено");
            }
        } catch (err) {
            console.error("Error fetching movie:", err);
            setError("Сталася помилка під час отримання даних.");
        }
    };

    return (
        <>
            <Navbar />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                    background: "linear-gradient(to bottom, #140648, #332754, #443455)",
                    color: "#ffffff",
                }}
            >
                <Container component="main" sx={{ flex: 1, py: 4 }}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{
                            textAlign: "center",
                            fontWeight: 600,
                            fontSize: "2rem",
                            color: "#fff",
                        }}
                    >
                        Пошук фільмів
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", margin: "24px", mb: 4 }}>
                        <TextField
                            label="Введіть назву фільму"
                            variant="outlined"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{
                                mr: 2,
                                width: "300px",
                                input: { color: "#ffffff" },
                                label: { color: "#aaaaaa" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "#ffffff",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#aaaaaa",
                                    },
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleSearch}
                            sx={{
                                backgroundColor: "#6a1b9a",
                                color: "#ffffff",
                                "&:hover": {
                                    backgroundColor: "#9c27b0",
                                },
                            }}
                        >
                            Пошук
                        </Button>
                    </Box>
                    {error && (
                        <Typography color="error" gutterBottom sx={{ textAlign: "center" }}>
                            {error}
                        </Typography>
                    )}
                    {movie && (
                        <Grid container justifyContent="center">
                            <Grid item xs={12} sm={6} md={4}>
                                <Card
                                    sx={{
                                        maxWidth: 345,
                                        backgroundColor: "#1e1e2f",
                                        color: "#ffffff",
                                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        alt={movie.title}
                                        height="400"
                                        image={movie.poster}
                                    />
                                    <CardContent sx={{ padding: "20px" }}>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="div"
                                            sx={{
                                                fontWeight: "bold",
                                                fontSize: "1.6rem",
                                                color: "#ffffff",
                                            }}
                                        >
                                            {movie.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="#bbbbbb"
                                            sx={{
                                                fontSize: "1.1rem",
                                                fontStyle: "italic",
                                            }}
                                        >
                                            {movie.year} | {movie.genre}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="#bbbbbb"
                                            sx={{ marginBottom: "12px" }}
                                        >
                                            Режисер: {movie.director}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="#bbbbbb"
                                            sx={{ fontSize: "0.9rem", height: "80px", overflow: "hidden" }}
                                        >
                                            {movie.plot}
                                        </Typography>
                                        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-start" }}>
                                            <Typography
                                                variant="body1"
                                                color="#ffcc00"
                                                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                            >
                                                ★★★★★
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    )}
                </Container>
                <Footer />
            </Box>
        </>
    );
};

export default Movies;
