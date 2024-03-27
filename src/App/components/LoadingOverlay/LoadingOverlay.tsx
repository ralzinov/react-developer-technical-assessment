import React from 'react';
import Box from '@mui/material/Box';
import { CircularProgress, Fade } from '@mui/material';
import styles from './LoadingOverlay.module.css';

export const LoadingOverlay: React.FC<{ show: boolean }> = ({ show }) => (
    <Fade in={show}>
        <Box className={styles.wrap}>
            <CircularProgress size={40} />
        </Box>
    </Fade>
);
