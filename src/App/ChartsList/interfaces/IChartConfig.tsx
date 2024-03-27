import { IFREDObservationsParams } from './fred';

export interface IChartLayerConfig<T> {
    type: T;
    name: string;
    field: string;
    source: {
        url: string,
        params: IFREDObservationsParams
    };
}

export interface IChartConfig<T> {
    field: string;
    layers: IChartLayerConfig<T>[];
}

export interface IChartComponentProps {
    config: IChartConfig<string>;
    data: Record<string, string>[];
}
