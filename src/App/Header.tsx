import React from 'react';
import { AppBar, Toolbar } from '@mui/material';

export const Header: React.FC = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#222' }} elevation={0}>
            <Toolbar>
                Charts
            </Toolbar>
        </AppBar>
    );
};
