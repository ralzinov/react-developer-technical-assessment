export type IChartDataSource<T> = () => Promise<T>;

export interface IChartLayerConfig<T, TData> {
    type: T;
    field: string;
    dataSource: IChartDataSource<TData>;
}

export interface IChartConfig<T, TData> {
    field: string;
    layers: IChartLayerConfig<T, TData>[];
}

export interface IChartComponentProps {
    config: IChartConfig<string, object>;
    data: Record<string, string>[];
}
