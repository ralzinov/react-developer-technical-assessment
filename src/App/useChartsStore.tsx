import { useEffect, useState } from 'react';
import { IChartConfig } from './ChartsList';

const LOCAL_STORAGE_CHARTS_KEY = 'charts';

const getInitialCharts = () => {
    try {
        const value = localStorage.getItem(LOCAL_STORAGE_CHARTS_KEY);
        return value ? JSON.parse(value) : [];
    } catch {
        console.error('Failed to restore charts from local storage. Value is not a valid JSON');
        return [];
    }
};

export const useChartsStore = () => {
    const [charts, setCharts] = useState<IChartConfig[]>(getInitialCharts());
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_CHARTS_KEY, JSON.stringify(charts));
    }, [charts]);

    return [charts, setCharts] as const;
};
