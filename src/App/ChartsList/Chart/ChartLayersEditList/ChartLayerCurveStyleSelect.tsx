import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { LayerCurveType } from '../../interfaces';

interface IChartLayerTypeSelectProps {
    value: LayerCurveType | undefined;
    onChange: (value: LayerCurveType) => void;
    disabled?: boolean;
}

const labels: Record<LayerCurveType, string> = {
    [LayerCurveType.LINEAR]: 'Linear',
    [LayerCurveType.SMOOTH]: 'Smooth',
    [LayerCurveType.STEP]: 'Step',
};

const options = Object.entries(labels).map(([id, label]) => ({ id, label, value: id }));

export const ChartLayerCurveStyleSelect: React.FC<IChartLayerTypeSelectProps> = ({ value, onChange, disabled }) => {
    return (
        <Autocomplete
            size={'small'}
            options={options}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label="Style" />}
            value={options.find((option) => option.value === value)}
            onChange={(_, option) => onChange(option.value as LayerCurveType)}
            disabled={disabled}
            disableClearable
        />
    );
};
