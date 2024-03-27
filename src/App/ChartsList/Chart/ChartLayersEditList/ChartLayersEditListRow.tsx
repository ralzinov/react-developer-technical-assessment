import { IChartLayerConfig } from '../../interfaces';
import { ISupportedChartTypes } from '../Chart.tsx';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

interface IChartLayersEditListRowProps {
    value: IChartLayerConfig<ISupportedChartTypes>;
    onChange: (value: IChartLayerConfig<ISupportedChartTypes>) => void;
    onDelete: () => void;
}

export const ChartLayersEditListRow: React.FC<IChartLayersEditListRowProps> = ({ value, onChange, onDelete }) => {
    return <div key={value.field}>
        {value.name}

        <IconButton onClick={onDelete} size={'small'}>
            <DeleteIcon />
        </IconButton>
    </div>;
};
