import Box from '@mui/material/Box';
import React, { useEffect, useRef, useState } from 'react';
import { IconButton, Popover } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { HexColorPicker } from 'react-colorful';
import { getRandomColor } from '../../../utils.ts';
import { useDebounce } from '@react-hook/debounce';

interface IChartLayerColorSelectProps {
    value: string | undefined;
    onChange: (color: string) => void;
}

export const ChartLayerColorSelect: React.FC<IChartLayerColorSelectProps> = ({ value, onChange }) => {
    const ref = useRef<HTMLDivElement>();
    const [isOpen, setOpen] = useState(false);
    const [color, setColor] = useDebounce(value || getRandomColor(), 400);

    useEffect(() => {
        if (color !== value) {
            onChange(color);
        }
    }, [color, onChange, value]);

    return (
        <Box ref={ref}>
            <IconButton size={'small'} onClick={() => setOpen(!isOpen)} title={'Select color'}>
                <CircleIcon sx={{ color }} />
            </IconButton>
            <Popover
                open={isOpen}
                anchorEl={ref.current}
                onClose={() => {
                    setOpen(false);
                    onChange(color);
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sx={{ '.MuiPopover-paper': { borderRadius: '8px', overflow: 'hidden' } }}
            >
                <HexColorPicker color={color} onChange={setColor} />
            </Popover>
        </Box>
    );
};
