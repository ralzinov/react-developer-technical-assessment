import React from 'react';
import { IChartFilters } from './Chart.tsx';
import { Button, ButtonGroup } from '@mui/material';
import { getYearDate } from './utils.ts';

interface IChartPeriodFiltersProps {
    value: IChartFilters;
    onChange: (value: IChartFilters) => void;
}


export const ChartPeriodFilters: React.FC<IChartPeriodFiltersProps> = ({ value, onChange }) => {

    const buttons = [
        { id: 'max', label: 'MAX', date: void 0 },
        { id: '20years', label: '20 years', date: getYearDate(-20) },
        { id: '10years', label: '10 years', date: getYearDate(-10) },
        { id: '5year', label: '5 years', date: getYearDate(-5) }
    ];

    const isActive = (date: string | undefined) => date === value?.from;

    return (
        <ButtonGroup variant="outlined" size={'small'}>
            {buttons.map(({ id, label, date }) => (
                <Button
                    key={id}
                    size={'small'}
                    variant={isActive(date) ? 'contained' : 'outlined'}
                    color={'secondary'}
                    onClick={() => onChange({ ...value, from: date })}
                >
                    {label}
                </Button>
            ))}
        </ButtonGroup>
    );
};
