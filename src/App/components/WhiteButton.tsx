import { Button, ButtonProps, styled } from '@mui/material';

export const WhiteButton = styled(Button)<ButtonProps>(() => ({
    color: '#fff',
    borderColor: '#fff',
    backgroundColor: 'transparent',
    '&:hover': {
        color: '#fff',
        borderColor: '#fff',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
}));
