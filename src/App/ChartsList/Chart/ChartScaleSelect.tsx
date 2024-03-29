import React from 'react';
import { ChartScale } from '../interfaces';
import { Autocomplete, TextField } from '@mui/material';

interface IChartScaleSelectProps {
    value: ChartScale | undefined;
    onChange: (value: ChartScale) => void;
}

const labels: Record<ChartScale, string> = {
    linear: 'Linear',
    pow: 'Pow',
    sqrt: 'Sqrt',
    log: 'log',
};

const options = Object.entries(labels).map(([id, label]) => ({ id, label, value: id }));

export const ChartScaleSelect: React.FC<IChartScaleSelectProps> = ({ value = ChartScale.LINEAR, onChange }) => {
    return (
        <Autocomplete
            size={'small'}
            options={options}
            sx={{ width: 170 }}
            renderInput={(params) => <TextField {...params} label="Scale" />}
            value={options.find((option) => option.value === value)}
            onChange={(_, option) => onChange(option.value as ChartScale)}
            disableClearable
        />
    );
};
