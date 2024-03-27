interface IChartDataSourceFactoryConfig<TParams> {
    url: string;
    params?: TParams;
}

const joinQueryParams = (params: Record<string, string>) => {
    const entries = Object.entries(params).filter(([, value]) => value !== null && value !== undefined);
    if (entries.length > 0) {
        return `?${entries.map(([key, value]) => `${key}=${value}`).join('&')}`;
    }
    return '';
};

const staticParams = {
    api_key: import.meta.env.VITE_FRED_API_KEY,
    file_type: 'json',
};

export const fetchFREDData = async <TResponse>(
    config: IChartDataSourceFactoryConfig<object>,
    filters: object,
): Promise<TResponse> => {
    const { url, params = {} } = config;
    const queryUrl = `${url}${joinQueryParams({ ...params, ...filters, ...staticParams })}`;
    return await fetch(queryUrl).then((res) => res.json());
};
