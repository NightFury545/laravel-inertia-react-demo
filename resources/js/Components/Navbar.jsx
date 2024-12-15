import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from '@inertiajs/inertia-react';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const pages = [
        { name: 'Головна', path: '/' },
        { name: 'Фільми', path: '/movies' },
        { name: 'Погода', path: '/weather' },
    ];

    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#140648', boxShadow: 'none', padding: '0 5%' }}>
            <Toolbar sx={{
                padding: 0,
                width: '100%',
                '@media (min-width: 600px)': {
                    paddingLeft: 0,
                    paddingRight: 0,
                },
            }}>
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold',  }}>
                    NightFury
                </Typography>

                {/* Десктопне меню */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, color: '#bcbcc4' }}>
                    {pages.map((page) => (
                        <Button key={page.name} color="inherit" component={Link} href={page.path}>
                            {page.name}
                        </Button>
                    ))}
                </Box>

                {/* Мобільне меню */}
                <Box sx={{ display: { xs: 'flex', md: 'none' }, color: '#bcbcc4' }}>
                    <IconButton color="inherit" onClick={handleMenuOpen}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        {pages.map((page) => (
                            <MenuItem key={page.name} onClick={handleMenuClose}>
                                <Button color="inherit" component={Link} href={page.path}>
                                    {page.name}
                                </Button>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
