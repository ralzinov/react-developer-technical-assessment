import { IFREDObservationsParams } from './fred';

export interface IChartLayerSource {
    url: string;
    name?: string;
    unit?: string;
    params?: IFREDObservationsParams;
}

export enum ChartScale {
    LINEAR = 'linear',
    POW = 'pow',
    SQRT = 'sqrt',
    LOG = 'log',
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
    scale?: ChartScale;
    yAxisTicks?: number;
    layers: IChartLayerConfig<T>[];
}

export interface IChartComponentProps {
    config: IChartConfig<string>;
    data: Record<string, string>[];
}
