import { IFREDObservationsResponse } from '../interfaces/fred';
import merge from 'lodash.merge';
import { useEffect, useState } from 'react';
import { fetchFREDData } from '../../chartDataSourceFactory.ts';
import { IChartFilters, ISupportedChartTypes } from './Chart.tsx';
import { IChartConfig } from '../interfaces';

type IConfig = IChartConfig<ISupportedChartTypes>;

const zipData = (
    data: {
        field: string;
        result?: IFREDObservationsResponse;
    }[],
    config: IConfig,
): Record<string, string>[] => {
    const resultMap = merge(
        {},
        ...data.map(({ field, result }) =>
            Object.fromEntries(
                result?.observations.map(({ date, value }) => [
                    date,
                    {
                        [config.field]: date,
                        [field]: value,
                    },
                ]) || [],
            ),
        ),
    );

    return Object.values(resultMap).sort((a, b) => {
        const dateA = new Date((a as Record<string, string>)[config.field]);
        const dateB = new Date((b as Record<string, string>)[config.field]);
        if (dateA > dateB) {
            return 1;
        }
        if (dateA < dateB) {
            return -1;
        }

        return 0;
    }) as Record<string, string>[];
};

export const useDataLoadEffect = (config: IConfig, filters?: IChartFilters) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Record<string, string>[]>([]);

    useEffect(() => {
        setLoading(true);
        Promise.all(
            config.layers.map(async ({ field, source }) => {
                try {
                    const result = await fetchFREDData<IFREDObservationsResponse>(source, {
                        observation_start: filters?.from,
                    });
                    return { field, result };
                } catch (e) {
                    console.error(e);
                    setError(true);
                    return { field };
                }
            }),
        )
            .then((result) => setData(zipData(result, config)))
            .finally(() => setLoading(false));
    }, [config, config.layers, filters]);

    return { data, loading, error };
};
