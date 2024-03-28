import React from 'react';
import Stack from '@mui/material/Stack';
import { Divider, TextField, Typography } from '@mui/material';
import { ChartLayersEditList } from './ChartLayersEditList';
import { IChartConfig } from '../ChartsList.tsx';
import Box from '@mui/material/Box';

interface IChartSettingsProps {
    value: IChartConfig;
    onChange: (value: IChartConfig) => void;
}

const Fieldset: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => (
    <Stack spacing={1}>
        <Typography variant={'body2'}>{text}</Typography>
        <Divider />
        {children}
    </Stack>
);

export const ChartSettings: React.FC<IChartSettingsProps> = ({ value, onChange }) => {
    return (
        <Stack paddingTop={2} paddingBottom={2} spacing={3} width={'100%'}>
            <Box>
                <TextField
                    label={'Name'}
                    value={value.name}
                    onChange={(e) => {
                        onChange({
                            ...value,
                            name: e.target.value.trim(),
                        });
                    }}
                />
            </Box>

            <Fieldset text={'Layers'}>
                <ChartLayersEditList
                    value={value.config.layers}
                    onChange={(layers) => onChange({ ...value, config: { ...value.config, layers } })}
                />
            </Fieldset>
        </Stack>
    );
};
