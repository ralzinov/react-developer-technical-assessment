import React from 'react';
import { AppBar, Toolbar } from '@mui/material';

export const Header: React.FC = () => {
    return (
        <AppBar position="static" elevation={0}>
            <Toolbar>App</Toolbar>
        </AppBar>
    );
};
