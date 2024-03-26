import React from 'react';
import Stack from '@mui/material/Stack';
import { Card } from './Card.tsx';
import { Chart, IChartProps } from './Chart';
import { ChartSettings } from './Chart/ChartSettings.tsx';

export interface IChartConfig extends IChartProps {
    id: string;
    name: string;
}

interface IChartsListProps {
    charts: IChartConfig[];
}

export const ChartsList: React.FC<IChartsListProps> = ({ charts = [] }) => {
    return (
        <Stack spacing={2}>
            {charts.map(({ id, name, config }) => (
                <Card key={id} title={name} settings={<ChartSettings />}>
                    <Chart config={config} />
                </Card>
            ))}
        </Stack>
    );
};
