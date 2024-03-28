import React, { useState } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import { AppBar, Collapse, Divider, IconButton, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';

interface ICardProps {
    title: string;
    settingsInitialOpen: boolean;
    actions: React.ReactNode;
    settings: React.ReactNode;
    children: React.ReactNode;
    onDelete: () => void;
}

const Content: React.FC<BoxProps> = ({ children, ...props }) => {
    return (
        <Box
            {...props}
            position={'relative'}
            padding={'8px 16px'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
        >
            {children}
        </Box>
    );
};

export const Card: React.FC<ICardProps> = ({ title, actions, settings, children, settingsInitialOpen, onDelete }) => {
    const [settingsCollapsed, setSettingsCollapsed] = useState(false/*!settingsInitialOpen*/);

    return (
        <MuiCard variant={'outlined'}>
            <Box>
                <AppBar
                    position={'relative'}
                    color={'transparent'}
                    sx={{ backgroundColor: 'primary.light' }}
                    elevation={0}
                >
                    <Content>
                        <Typography variant={'button'}>{title}</Typography>
                        <Stack spacing={1} direction={'row'} alignItems={'center'}>
                            {actions}
                            <IconButton onClick={() => setSettingsCollapsed(!settingsCollapsed)} size={'small'}>
                                <SettingsIcon />
                            </IconButton>
                            <IconButton onClick={onDelete} size={'small'}>
                                <DeleteIcon />
                            </IconButton>
                        </Stack>
                    </Content>
                </AppBar>
                <Collapse in={!settingsCollapsed}>
                    <Divider />
                    <Content sx={{ backgroundColor: '#0000000a'}}>{settings}</Content>
                </Collapse>
                {children && (
                    <>
                        <Divider />
                        <Content>{children}</Content>
                    </>
                )}
            </Box>
        </MuiCard>
    );
};
