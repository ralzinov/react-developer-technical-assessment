import React, { useEffect, useMemo, useState } from 'react';
import { useDebounce } from '@react-hook/debounce';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { IFREDSeriesSearchResponse } from '../../interfaces/fred/IFREDSeriesSearchResponse.ts';
import { IChartLayerSource } from '../../interfaces';
import { joinQueryParams } from '../../../utils.ts';
import { useInView } from 'react-intersection-observer';

interface IChartLayerSelectProps {
    value: IChartLayerSource;
    onChange: (value: IChartLayerSource) => void;
}

interface IOption {
    id: string;
    label: string;
    value: string;
}

const FRED_SERIES_SEARCH_URL = '/fred/series/search';

const fetchDataChunk = async (url: string) => {
    try {
        const response = await fetch(url);
        if (response.status !== 200) {
            throw new Error(`Failed to load data status: ${response.statusText}`);
        }
        const result = (await response.json()) as IFREDSeriesSearchResponse;
        return result?.seriess?.map(({ id, title }): IOption => ({ id, label: title, value: id })) || [];
    } catch (e) {
        console.error(e);
        throw new Error('Failed to load data');
    }
};

function* dataSource(searchQuery: string, pageSize = 20) {
    let page = 0;
    while (true) {
        const params = {
            limit: pageSize,
            offset: page * pageSize,
            search_text: searchQuery,
            api_key: import.meta.env.VITE_FRED_API_KEY,
            order_by: 'title',
            file_type: 'json',
        };
        yield fetchDataChunk(`${FRED_SERIES_SEARCH_URL}${joinQueryParams(params)}`);
        page++;
    }
}

const useFredSeriesDataSource = (searchQuery: string) => {
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
        if (searchQuery !== prevSearchQuery) {
            setPrevSearchQuery(searchQuery);
            if (searchQuery) {
                paginator.next();
            }
        }
    }, [paginator, prevSearchQuery, searchQuery]);

    return [paginator, { options, loading }] as const;
};

const isOption = (value: unknown): value is IOption => !!(value as IOption)?.value;

export const ChartLayerSourceSelect: React.FC<IChartLayerSelectProps> = ({ value, onChange }) => {
    const { ref, inView } = useInView();
    const [query, setQuery] = useDebounce<string>('', 400);
    const [paginator, { options, loading }] = useFredSeriesDataSource(query);

    useEffect(() => {
        if (inView && !loading) {
            paginator.next();
        }
    }, [inView, loading, paginator]);
    
    return (
        <Autocomplete
            size={'small'}
            options={options}
            onChange={(_, newValue) => {
                if (isOption(newValue)) {
                    onChange({
                        url: '/fred/series/observations',
                        name: newValue.label,
                        params: {
                            series_id: newValue.value
                        }
                    });
                }
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder={'Start typing to search'}
                    onChange={(e) => setQuery(e.target.value.trim())}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
            renderOption={(props, option, { index }) => {
                const isTriggerIndex = index === options.length - 5;
                return (
                    <li {...props} ref={isTriggerIndex ? ref : void 0} key={option.id}>
                        {option.label}
                    </li>
                );
            }}
            filterOptions={(x) => x}
            selectOnFocus
            fullWidth
            freeSolo
        />
    );
};
