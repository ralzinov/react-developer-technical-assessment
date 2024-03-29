import { useDebounce } from '@react-hook/debounce';
import { useInView } from 'react-intersection-observer';
import React, { useEffect } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { IChartLayerSource } from '../../interfaces';
import { isOption, useFredSeriesDataSource } from './useFredSeriesDataSource.ts';

interface IChartLayerSelectProps {
    value: IChartLayerSource;
    onChange: (value: IChartLayerSource) => void;
}

export const ChartLayerSourceSelect: React.FC<IChartLayerSelectProps> = ({ value, onChange }) => {
    const { ref, inView } = useInView();
    const [query, setQuery] = useDebounce<string | null>('', 200);
    const [paginator, { options, loading }] = useFredSeriesDataSource(query, value);

    useEffect(() => {
        if (inView && !loading) {
            paginator.next();
        }
    }, [inView, loading, paginator]);

    const option = options.find(({ id }) => value?.params?.series_id === id);

    return (
        <Autocomplete
            size={'small'}
            options={options}
            value={option || null}
            onChange={(_, newValue) => {
                if (isOption(newValue)) {
                    setQuery(newValue.label);
                    onChange({
                        url: '/fred/series/observations',
                        name: newValue.label,
                        unit: newValue.unit,
                        params: {
                            series_id: newValue.value,
                        },
                    });
                }
            }}
            renderInput={(params) => {
                const inputProps = { ...params.inputProps };
                inputProps.value = (query === null ? query : query || option?.label) || '';

                return (
                    <TextField
                        {...params}
                        inputProps={inputProps}
                        placeholder={'Start typing to search'}
                        onChange={(e) => setQuery(e.target.value.trim() || null)}
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
                );
            }}
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
