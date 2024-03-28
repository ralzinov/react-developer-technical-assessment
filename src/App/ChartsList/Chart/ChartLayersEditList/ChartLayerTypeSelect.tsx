import React from 'react';
import { ISupportedChartTypes } from '../Chart.tsx';
import { Autocomplete, TextField } from '@mui/material';

interface IChartLayerTypeSelectProps {
    value: ISupportedChartTypes;
    onChange: (value: ISupportedChartTypes) => void;
}

const labels: Record<ISupportedChartTypes, string> = {
    LINE: 'Line',
    AREA: 'Area',
    COLUMNS: 'Column'
}

const options = Object.entries(labels).map(([id, label]) => ({ id, label, value: id }));

export const ChartLayerTypeSelect: React.FC<IChartLayerTypeSelectProps> = ({ value, onChange }) => {
    return (
        <Autocomplete
            size={'small'}
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Type" />}
            value={options.find((option) => option.value === value)}
            onChange={(_, option) => onChange(option.value as ISupportedChartTypes)}
            disableClearable
        />
    );
};
