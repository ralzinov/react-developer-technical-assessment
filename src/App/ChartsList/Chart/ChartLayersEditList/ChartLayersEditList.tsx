import React from 'react';
import { Divider } from '@mui/material';
import Stack from '@mui/material/Stack';
import { NoElementsPlaceholder } from '../../../components/NoElementsPlaceholder.tsx';
import { ChartLayersEditListRow } from './ChartLayersEditListRow.tsx';
import { IChartLayerConfig } from '../../interfaces';
import { ISupportedChartTypes } from '../Chart.tsx';

interface IChartLayersEditListProps {
    value: IChartLayerConfig<ISupportedChartTypes>[];
    onChange: (value: IChartLayerConfig<ISupportedChartTypes>[]) => void;
    onCreate: () => void;
}

export const ChartLayersEditList: React.FC<IChartLayersEditListProps> = ({ value, onChange, onCreate }) => {
    return (
        <Stack spacing={2}>
            {value.map((layer, index) => (
                <React.Fragment key={layer.field}>
                    {index > 0 && <Divider />}
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
                </React.Fragment>
            ))}
            {value.length === 0 && <NoElementsPlaceholder onCreate={onCreate} />}
        </Stack>
    );
};
