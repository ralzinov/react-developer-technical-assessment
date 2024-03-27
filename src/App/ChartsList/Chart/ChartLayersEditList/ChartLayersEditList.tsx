import React from 'react';
import Stack from '@mui/material/Stack';
import { ChartLayersEditListRow } from './ChartLayersEditListRow.tsx';
import { IChartLayerConfig } from '../../interfaces';
import { ISupportedChartTypes } from '../Chart.tsx';

interface IChartLayersEditListProps {
    value: IChartLayerConfig<ISupportedChartTypes>[];
    onChange: (value: IChartLayerConfig<ISupportedChartTypes>[]) => void;
}

export const ChartLayersEditList: React.FC<IChartLayersEditListProps> = ({ value, onChange }) => {

    return (
        <Stack spacing={1}>
            {value.map((layer, index) => (
                <ChartLayersEditListRow
                    key={layer.field}
                    value={layer}
                    onChange={(newLayer) => {
                        const newValue = [...value];
                        newValue[index] = newLayer;
                        onChange(newValue);
                    }}
                    onDelete={() => {
                        const newValue = [...value];
                        newValue.splice(index, 1);
                        onChange(newValue);
                    }}
                />
            ))}
        </Stack>
    );
};
