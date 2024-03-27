import { IChartLayerConfig } from '../../interfaces';
import { ISupportedChartTypes } from '../Chart.tsx';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { ChartLayerSourceSelect } from './ChartLayerSourceSelect.tsx';

interface IChartLayersEditListRowProps {
    value: IChartLayerConfig<ISupportedChartTypes>;
    onChange: (value: IChartLayerConfig<ISupportedChartTypes>) => void;
    onDelete: () => void;
}

export const ChartLayersEditListRow: React.FC<IChartLayersEditListRowProps> = ({ value, onChange, onDelete }) => {
    return (
        <div>
            <ChartLayerSourceSelect value={value.source} onChange={(source) => onChange({ ...value, source })} />
            <IconButton onClick={onDelete} size={'small'}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
};
