import { IFREDSeriesSearchResponse } from '../../interfaces/fred/IFREDSeriesSearchResponse.ts';
import { joinQueryParams } from '../../../utils.ts';
import { useEffect, useMemo, useState } from 'react';

const FRED_SERIES_SEARCH_URL = '/fred/series/search';

interface IOption {
    id: string;
    label: string;
    value: string;
    unit: string | undefined;
}

export const isOption = (value: unknown): value is IOption => !!(value as IOption)?.value;

const fetchDataChunk = async (url: string) => {
    try {
        const response = await fetch(url);
        if (response.status !== 200) {
            throw new Error(`Failed to load data status: ${response.statusText}`);
        }
        const result = (await response.json()) as IFREDSeriesSearchResponse;
        return (
            result?.seriess?.map(
                ({ id, title, units_short }): IOption => ({
                    id,
                    label: title,
                    value: id,
                    unit: units_short,
                }),
            ) || []
        );
    } catch (e) {
        console.error(e);
        throw new Error('Failed to load data');
    }
};

function* dataSource(searchQuery: string | null, pageSize = 20) {
    let page = 0;
    while (true) {
        const params = {
            limit: pageSize,
            offset: page * pageSize,
            search_text: searchQuery || '',
            api_key: import.meta.env.VITE_FRED_API_KEY,
            order_by: 'title',
            file_type: 'json',
        };
        yield fetchDataChunk(`${FRED_SERIES_SEARCH_URL}${joinQueryParams(params)}`);
        page++;
    }
}

export const useFredSeriesDataSource = (searchQuery: string | null) => {
    const [loading, setLoading] = useState(false);
    const [prevSearchQuery, setPrevSearchQuery] = useState('');
    const [options, setOptions] = useState<IOption[]>([]);
    const series = useMemo(() => {
        setOptions([]);
        return dataSource(searchQuery);
    }, [searchQuery]);

    const paginator = useMemo(() => {
        return {
            next: async () => {
                setLoading(true);
                const nextPage = (await series.next().value) || [];
                setOptions([...options, ...nextPage]);
                setLoading(false);
            },
        };
    }, [options, series]);

    useEffect(() => {
        if (searchQuery && searchQuery !== prevSearchQuery) {
            setPrevSearchQuery(searchQuery);
            if (searchQuery) {
                paginator.next();
            }
        }
    }, [paginator, prevSearchQuery, searchQuery]);

    return [paginator, { options, loading }] as const;
};
