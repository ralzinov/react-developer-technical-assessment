import { useDebounce } from '@react-hook/debounce';
import { useInView } from 'react-intersection-observer';
import React, { useEffect } from 'react';
import { Autocomplete, CircularProgress } from '@mui/material';
import { IChartLayerSource } from '../../interfaces';
import { isOption, useFredSeriesDataSource } from './useFredSeriesDataSource.ts';
import { DebouncedTextInput } from '../../../components/DebouncedTextInput.tsx';

interface IChartLayerSelectProps {
    value: IChartLayerSource;
    onChange: (value: IChartLayerSource) => void;
}

export const ChartLayerSourceSelect: React.FC<IChartLayerSelectProps> = ({ value, onChange }) => {
    const { ref, inView } = useInView();
    const [query, setQuery] = useDebounce<string>(value?.name || '', 200);
    const [paginator, { options, loading }] = useFredSeriesDataSource(query);

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
            value={option}
            onChange={(_, newValue) => {
                if (isOption(newValue)) {
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
                delete inputProps.value;

                return (
                    <DebouncedTextInput
                        {...params}
                        value={query || value?.name}
                        inputProps={inputProps}
                        placeholder={'Start typing to search'}
                        onChange={(e) => setQuery(e as string)}
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
            disableClearable
            selectOnFocus
            fullWidth
            freeSolo
        />
    );
};
