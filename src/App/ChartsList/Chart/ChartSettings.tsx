import React from 'react';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import { IChartConfig } from '../ChartsList.tsx';
import { ChartLayersEditList } from './ChartLayersEditList/ChartLayersEditList.tsx';

interface IChartSettingsProps {
    value: IChartConfig;
    onChange: (value: IChartConfig) => void;
}

export const ChartSettings: React.FC<IChartSettingsProps> = ({ value, onChange }) => {

    return (
        <Stack paddingTop={2} paddingBottom={2} spacing={2}>
            <TextField
                label={'Name'}
                value={value.name}
                onChange={(e) => {
                    onChange({
                        ...value,
                        name: e.target.value.trim()
                    });
                }}
            />

            <ChartLayersEditList
                value={value.config.layers}
                onChange={(layers) => onChange({ ...value, config: { ...value.config, layers } })}
            />
        </Stack>
    );
};
