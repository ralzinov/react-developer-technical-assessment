import React from 'react';
import { TextField } from '@mui/material';
import { IChartLayerSource } from '../../interfaces';

interface IChartLayerSelectProps {
    value: IChartLayerSource;
    onChange: (value: IChartLayerSource) => void;
}

export const ChartLayerSourceSelect: React.FC<IChartLayerSelectProps> = ({ value, onChange }) => {
    return <TextField label={value.params.series_id} size={'small'} fullWidth />;
};
