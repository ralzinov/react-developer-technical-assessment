import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import { ChartPeriodFilters } from './Chart/ChartPeriodFilters.tsx';
import { Chart, IChartFilters, IChartProps } from './Chart';
import { ChartSettings } from './Chart/ChartSettings.tsx';
import { getYearDate } from './Chart/utils.ts';
import { Card } from './Card.tsx';
import { NoElementsPlaceholder } from '../components/NoElementsPlaceholder.tsx';

export interface IChartConfig extends IChartProps {
    id: string;
    name: string;
}

interface IChartsListProps {
    charts: IChartConfig[];
    onChange: (charts: IChartConfig[]) => void;
    onCreate: () => void;
}

export const ChartsList: React.FC<IChartsListProps> = ({ charts = [], onChange, onCreate }) => {
    const [filters, setFilters] = useState<Record<string, IChartFilters>>({});

    return (
        <Stack spacing={3}>
            {charts.map((chart, index) => {
                const { id, name, config } = chart;
                const chartFilters = filters[id] || { from: getYearDate(-20) };
                const isEmpty = config.layers.every((layer) => !layer.source.params?.series_id);

                const changeChart = (newChart: IChartConfig) => {
                    const newCharts = [...charts];
                    newCharts[index] = newChart;
                    onChange(newCharts);
                };

                const deleteChart = () => {
                    const newCharts = [...charts];
                    newCharts.splice(index, 1);
                    onChange(newCharts);
                };

                return (
                    <Card
                        key={id}
                        title={name}
                        settings={<ChartSettings value={chart} onChange={changeChart} />}
                        settingsInitialOpen={isEmpty}
                        onDelete={deleteChart}
                        actions={
                            <ChartPeriodFilters
                                value={chartFilters}
                                onChange={(newFilters) => setFilters({ ...filters, [id]: newFilters })}
                            />
                        }
                    >
                        {!isEmpty && <Chart config={config} filters={chartFilters} />}
                    </Card>
                );
            })}
            {charts.length === 0 && <NoElementsPlaceholder onCreate={onCreate} />}
        </Stack>
    );
};
