import { IFREDObservationsParams } from './fred';

export interface IChartLayerSource {
    url: string;
    name: string;
    unit: string | undefined;
    params: IFREDObservationsParams;
}

export interface IChartLayerConfig<T> {
    type: T;
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
