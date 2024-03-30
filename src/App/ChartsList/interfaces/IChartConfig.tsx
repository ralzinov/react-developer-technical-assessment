import { IFREDObservationsParams } from './fred';

export interface IChartLayerSource {
    url: string;
    name?: string;
    unit?: string;
    params?: IFREDObservationsParams;
}

export enum ChartScale {
    LINEAR = 'linear',
    SQRT = 'sqrt',
}

export enum LayerCurveType {
    LINEAR = 'linear',
    SMOOTH = 'monotone',
    STEP = 'step',
}

export interface IChartLayerConfig<T> {
    type: T;
    field: string;
    curveType?: LayerCurveType;
    source: IChartLayerSource;
    color?: string;
    dots?: boolean;
}

export interface IChartConfig<T> {
    field: string;
    scale?: ChartScale;
    yAxisLabel?: string;
    yAxisTicks?: number;
    layers: IChartLayerConfig<T>[];
}

export interface IChartComponentProps {
    config: IChartConfig<string>;
    data: Record<string, string>[];
}
