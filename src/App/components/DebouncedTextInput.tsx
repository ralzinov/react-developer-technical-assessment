import React, { useEffect } from 'react';
import { StandardTextFieldProps } from '@mui/material/TextField/TextField';
import { TextField } from '@mui/material';
import { useDebounce } from '@react-hook/debounce';

interface IDebouncedTextInputProps<T> extends Omit<StandardTextFieldProps, 'onChange' | 'value'> {
    value: T;
    onChange: (value: T) => void;
    debounce?: number;
}

export const DebouncedTextInput: React.FC<IDebouncedTextInputProps<unknown>> = ({
    debounce = 400,
    value,
    onChange,
    ...props
}) => {
    const [inputValue, setInputValue] = useDebounce(value, debounce);

    useEffect(() => {
        if (String(value) !== String(inputValue)) {
            onChange(inputValue);
        }
    }, [debounce, inputValue, onChange, value]);

    return <TextField {...props} defaultValue={inputValue} onChange={(e) => setInputValue(e.target.value)} />;
};
