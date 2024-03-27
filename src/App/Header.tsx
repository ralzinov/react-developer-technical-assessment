import React from 'react';
import { AppBar, Toolbar } from '@mui/material';

export const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <AppBar position="static" elevation={0}>
            <Toolbar>{children}</Toolbar>
        </AppBar>
    );
};
