import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Button, Divider, TextField, Typography } from '@mui/material';
import { ChartLayersEditList } from './ChartLayersEditList';
import { getInitialLayerConfig } from '../../utils.ts';
import { IChartConfig } from '../ChartsList.tsx';

interface IChartSettingsProps {
    value: IChartConfig;
    onChange: (value: IChartConfig) => void;
}

const Fieldset: React.FC<{ text: string; children: React.ReactNode; action: React.ReactNode }> = ({
    text,
    children,
    action,
}) => (
    <Box>
        <Stack direction={'row'} alignItems={'flex-end'} justifyContent={'space-between'} marginBottom={1}>
            <Typography variant={'button'}>{text}</Typography>
            {action}
        </Stack>
        <Divider sx={{ marginBottom: '16px' }} />
        {children}
    </Box>
);

export const ChartSettings: React.FC<IChartSettingsProps> = ({ value, onChange }) => {
    const addLayer = () => {
        const newLayer = getInitialLayerConfig();
        onChange({ ...value, config: { ...value.config, layers: [newLayer, ...value.config.layers] } });
    };

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

            <Fieldset
                text={'Layers'}
                action={
                    <Button size={'small'} variant={'outlined'} onClick={addLayer}>
                        Add
                    </Button>
                }
            >
                <ChartLayersEditList
                    value={value.config.layers}
                    onChange={(layers) => onChange({ ...value, config: { ...value.config, layers } })}
                    onCreate={addLayer}
                />
            </Fieldset>
        </Stack>
    );
};
