import React, { useState } from 'react';
import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import { AppBar, Collapse, Divider, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import Stack from '@mui/material/Stack';

interface ICardProps {
    title: string;
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

export const Card: React.FC<ICardProps> = ({ title, actions, settings, children }) => {
    const [settingsCollapsed, setSettingsCollapsed] = useState(false);

    return (
        <MuiCard variant={'outlined'}>
            <Box>
                <AppBar position={'relative'} color={'transparent'} elevation={0}>
                    <Content>
                        {title}
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
                <Divider />
                <Content>
                    {children}
                </Content>
            </Box>
        </MuiCard>
    );
};
