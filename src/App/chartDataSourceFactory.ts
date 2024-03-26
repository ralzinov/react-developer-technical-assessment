import { IChartDataSource } from './ChartsList/interfaces';

interface IChartDataSourceFactoryConfig<TParams> {
    url: string;
    params?: TParams;
}

const joinQueryParams = (params: Record<string, string>) => {
    const entries = Object.entries(params);
    if (entries.length > 0) {
        return `?${entries.map(([key, value]) => `${key}=${value}`).join('&')}`;
    }
    return '';
};

const staticParams = {
    api_key: import.meta.env.VITE_FRED_API_KEY,
    file_type: 'json'
};

export const fredDataSourceFactory =
    <TParams, TResponse>(config: IChartDataSourceFactoryConfig<TParams>): IChartDataSource<TResponse> => {
        const { url, params = {} } = config;
        if (!url.startsWith('/fred')) {
            throw new Error(`Url is not supported: ${url}`);
        }

        return async () => {
            return await fetch(`${url}${joinQueryParams({ ...params, ...staticParams })}`).then((res) => res.json());
        };
    };
