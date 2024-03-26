import React, { useEffect, useState } from 'react';
import { IChartComponentProps, IChartConfig } from '../interfaces';
import { LinearChart, LinearChartType } from './LinearChart';
import { IFREDObservationsResponse } from '../interfaces/fred';
import merge from 'lodash.merge';

export type ISupportedChartTypes = LinearChartType;

type IConfig = IChartConfig<ISupportedChartTypes, IFREDObservationsResponse>;

export interface IChartProps {
    config: IConfig;
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

const zipData = (data: {
    field: string,
    result?: IFREDObservationsResponse
}[], config: IConfig): Record<string, string>[] => {
    const resultMap = merge({}, ...data.map(({ field, result }) => (
        Object.fromEntries(
            result?.observations.map(({ date, value }) =>
                [date, {
                    [config.field]: date,
                    [field]: value
                }]
            ) || []
        )
    )));

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

const useDataLoadEffect = (config: IConfig) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Record<string, string>[]>([]);

    useEffect(() => {
        setLoading(true);
        Promise.all(config.layers.map(async ({ field, dataSource }) => {
            try {
                const result = await dataSource();
                return { field, result };
            } catch (e) {
                console.error(e);
                setError(true);
                return { field };
            }
        }))
            .then((result) => setData(zipData(result, config)))
            .finally(() => setLoading(false));
    }, [config, config.layers]);

    return { data, loading, error };
};

export const Chart: React.FC<IChartProps> = ({ config }) => {

    // TODO handle loading, error
    const { data } = useDataLoadEffect(config);
    const coordinatesType = getChartCoordinatesType(config);
    const Component = chartComponentMap[coordinatesType];
    return Component ? <Component config={config} data={data} /> : null;
};
