import React from 'react';
import Box from '@mui/material/Box';
import { IChartComponentProps, IChartConfig } from '../interfaces';
import { LoadingOverlay } from '../../components/LoadingOverlay';
import { LinearChart, LinearChartType } from './LinearChart';
import { useDataLoadEffect } from './useDataLoadEffect.ts';

export type ISupportedChartTypes = LinearChartType;

type IConfig = IChartConfig<ISupportedChartTypes>;

export interface IChartFilters {
    from?: string;
}

export interface IChartProps {
    config: IConfig;
    filters?: IChartFilters;
}

enum ChartCoordinateType {
    CARTESIAN = 'CARTESIAN'
}

const getChartCoordinatesType = (config: IConfig): ChartCoordinateType => {
    const isCartesian = config.layers.every(({ type }) => type in LinearChartType);

    if (isCartesian) {
        return ChartCoordinateType.CARTESIAN;
    }

    throw new Error('Coordinates type is not implemented');
};

const chartComponentMap: Record<ChartCoordinateType, React.FC<IChartComponentProps>> = {
    CARTESIAN: LinearChart
};

export const Chart: React.FC<IChartProps> = ({ config, filters }) => {
    const { data, loading } = useDataLoadEffect(config, filters);
    const coordinatesType = getChartCoordinatesType(config);
    const Component = chartComponentMap[coordinatesType];

    return (
        <Box width={'100%'}>
            <LoadingOverlay show={loading} />
            {Component && <Component config={config} data={data} />}
        </Box>
    );
};
