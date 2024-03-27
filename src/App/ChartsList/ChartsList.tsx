import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import { ChartPeriodFilters } from './Chart/ChartPeriodFilters.tsx';
import { Chart, IChartFilters, IChartProps } from './Chart';
import { ChartSettings } from './Chart/ChartSettings.tsx';
import { Card } from './Card.tsx';

export interface IChartConfig extends IChartProps {
    id: string;
    name: string;
}

interface IChartsListProps {
    charts: IChartConfig[];
}

export const ChartsList: React.FC<IChartsListProps> = ({ charts = [] }) => {
    const [filters, setFilters] = useState<Record<string, IChartFilters>>({});

    return (
        <Stack spacing={2}>
            {charts.map(({ id, name, config }) => (
                <Card
                    key={id}
                    title={name}
                    settings={<ChartSettings />}
                    actions={
                        <ChartPeriodFilters
                            value={filters[id]}
                            onChange={(newFilters) => setFilters({...filters, [id]: newFilters})}
                        />
                    }
                >
                    <Chart config={config} filters={filters[id]} />
                </Card>
            ))}
        </Stack>
    );
};
