import { IChartLayerConfig } from '../../interfaces';
import { ISupportedChartTypes } from '../Chart.tsx';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { ChartLayerSourceSelect } from './ChartLayerSourceSelect.tsx';
import Stack from '@mui/material/Stack';
import { ChartLayerTypeSelect } from './ChartLayerTypeSelect.tsx';

interface IChartLayersEditListRowProps {
    value: IChartLayerConfig<ISupportedChartTypes>;
    onChange: (value: IChartLayerConfig<ISupportedChartTypes>) => void;
    onDelete: () => void;
}

export const ChartLayersEditListRow: React.FC<IChartLayersEditListRowProps> = ({ value, onChange, onDelete }) => {
    return (
        <Stack direction={'row'} spacing={2} width={'100%'}>
            <ChartLayerSourceSelect value={value.source} onChange={(source) => onChange({ ...value, source })} />
            <ChartLayerTypeSelect value={value.type} onChange={(type) => onChange({ ...value, type })} />
            <IconButton onClick={onDelete} size={'small'} sx={{ marginLeft: 'auto' }}>
                <DeleteIcon />
            </IconButton>
        </Stack>
    );
};
