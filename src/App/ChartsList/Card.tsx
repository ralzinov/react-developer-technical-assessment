import React, { useState } from 'react';
import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import { AppBar, Collapse, Divider, IconButton, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import Stack from '@mui/material/Stack';

interface ICardProps {
    title: string;
    settingsInitialOpen: boolean;
    actions: React.ReactNode;
    settings: React.ReactNode;
    children: React.ReactNode;
}

const Content: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Box position={'relative'} padding={'8px 16px'} display={'flex'} alignItems={'center'}
             justifyContent={'space-between'}>
            {children}
        </Box>
    );
};

export const Card: React.FC<ICardProps> = ({ title, actions, settings, children, settingsInitialOpen }) => {
    const [settingsCollapsed, setSettingsCollapsed] = useState(!settingsInitialOpen);

    return (
        <MuiCard variant={'outlined'}>
            <Box>
                <AppBar position={'relative'} color={'transparent'} sx={{ backgroundColor: 'primary.light'}} elevation={0}>
                    <Content>
                        <Typography variant={'button'}>{title}</Typography>
                        <Stack spacing={1} direction={'row'}>
                            {actions}
                            <IconButton onClick={() => setSettingsCollapsed(!settingsCollapsed)}>
                                <SettingsIcon />
                            </IconButton>
                        </Stack>
                    </Content>
                </AppBar>
                <Collapse in={!settingsCollapsed}>
                    <Divider />
                    <Content>
                        {settings}
                    </Content>
                </Collapse>
                {children && (
                    <>
                    <Divider />
                        <Content>
                            {children}
                        </Content>
                    </>
                )}
            </Box>
        </MuiCard>
    );
};
