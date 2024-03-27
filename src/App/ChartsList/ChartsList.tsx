import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import { ChartPeriodFilters } from './Chart/ChartPeriodFilters.tsx';
import { Chart, IChartFilters, IChartProps } from './Chart';
import { ChartSettings } from './Chart/ChartSettings.tsx';
import { getYearDate } from './Chart/utils.ts';
import { Card } from './Card.tsx';

export interface IChartConfig extends IChartProps {
    id: string;
    name: string;
}

interface IChartsListProps {
    charts: IChartConfig[];
    onChange: (charts: IChartConfig[]) => void;
}

export const ChartsList: React.FC<IChartsListProps> = ({ charts = [], onChange }) => {
    const [filters, setFilters] = useState<Record<string, IChartFilters>>({});

    return (
        <Stack spacing={3}>
            {charts.map(({ id, name, config }, index) => {
                const chartFilters = filters[id] || { from: getYearDate(-20) };
                const isEmpty = config.layers.length === 0;
                return (
                    <Card
                        key={id}
                        title={name}
                        settings={<ChartSettings />}
                        settingsInitialOpen={isEmpty}
                        onDelete={() => {
                            const newCharts = [...charts];
                            newCharts.splice(index, 1);
                            onChange(newCharts);
                        }}
                        actions={
                            <ChartPeriodFilters
                                value={chartFilters}
                                onChange={(newFilters) => setFilters({ ...filters, [id]: newFilters })}
                            />
                        }
                    >
                        {!isEmpty && (
                            <Chart config={config} filters={chartFilters} />
                        )}
                    </Card>
                );
            })}
        </Stack>
    );
};
