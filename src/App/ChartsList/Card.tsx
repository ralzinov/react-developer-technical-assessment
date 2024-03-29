import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import React, { useRef, useState } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppBar, Collapse, Divider, IconButton, Typography } from '@mui/material';

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
    const ref = useRef<HTMLDivElement>();
    const [settingsCollapsed, setSettingsCollapsed] = useState(!settingsInitialOpen);

    const toggleSettingsPanel = () => {
        setSettingsCollapsed(!settingsCollapsed);
        setTimeout(() => {
            if (settingsCollapsed) {
                ref.current?.scrollIntoView({ behavior: 'smooth' });
            }
        }, 200);
    }

    return (
        <MuiCard variant={'outlined'}>
            <Box ref={ref}>
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
                            <IconButton onClick={toggleSettingsPanel} size={'small'}>
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
