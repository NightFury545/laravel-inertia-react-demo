import {Box, Typography} from "@mui/material";
import React from "react";

const Footer = () => {
    return (
        <>
            <Box
                sx={{
                    marginTop: '4rem',
                    padding: '2rem 0',
                    textAlign: 'center',
                    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                }}
            >
                <Typography variant="body2" sx={{color: 'rgba(255, 255, 255, 0.7)'}}>
                    © 2024 NightFury. Всі права захищені.
                </Typography>
                <Typography variant="body2" sx={{color: 'rgba(255, 255, 255, 0.7)'}}>
                    Контакти: nightfury@gmail.com
                </Typography>
            </Box>
        </>
    )
};

export default Footer;
