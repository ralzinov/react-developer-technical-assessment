import { IFREDObservationsParams } from './fred';

export interface IChartLayerSource {
    url: string;
    name: string;
    params: IFREDObservationsParams;
}

export interface IChartLayerConfig<T> {
    type: T;
    name: string;
    field: string;
    source: IChartLayerSource;
    color?: string;
    dots?: boolean;
}

export interface IChartConfig<T> {
    field: string;
    layers: IChartLayerConfig<T>[];
}

export interface IChartComponentProps {
    config: IChartConfig<string>;
    data: Record<string, string>[];
}
