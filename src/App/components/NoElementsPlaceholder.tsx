import React from 'react';
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';

interface INoElementsPlaceholderProps {
    onCreate: () => void;
}

export const NoElementsPlaceholder: React.FC<INoElementsPlaceholderProps> = ({ onCreate }) => {

    return (
        <Stack spacing={2} padding={2} height={'300px'} alignItems={'center'} justifyContent={'center'}>
            <Typography variant={'h5'}>No elements</Typography>
            <Typography variant={'subtitle1'}>Start adding by clicking button</Typography>
            <Button onClick={onCreate} variant={'contained'}>
                Add
            </Button>
        </Stack>
    );
};
