import React from 'react';
import { ChartScale } from '../interfaces';
import { Autocomplete, TextField } from '@mui/material';

interface IChartScaleSelectProps {
    label: string;
    value: ChartScale | undefined;
    onChange: (value: ChartScale) => void;
}

const labels: Record<ChartScale, string> = {
    linear: 'Linear',
    sqrt: 'Sqrt',
};

const options = Object.entries(labels).map(([id, label]) => ({ id, label, value: id }));

export const ChartScaleSelect: React.FC<IChartScaleSelectProps> = ({ label, value = ChartScale.LINEAR, onChange }) => {
    return (
        <Autocomplete
            size={'small'}
            options={options}
            sx={{ width: 170 }}
            renderInput={(params) => <TextField {...params} label={label} />}
            value={options.find((option) => option.value === value)}
            onChange={(_, option) => onChange(option.value as ChartScale)}
            disableClearable
        />
    );
};
