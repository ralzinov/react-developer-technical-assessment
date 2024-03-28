import { IChartLayerConfig } from '../../interfaces';
import { ISupportedChartTypes } from '../Chart.tsx';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Fade, FormControlLabel, IconButton, Switch } from '@mui/material';
import { ChartLayerSourceSelect } from './ChartLayerSourceSelect.tsx';
import Stack from '@mui/material/Stack';
import { ChartLayerTypeSelect } from './ChartLayerTypeSelect.tsx';
import { LinearChartType } from '../LinearChart';

interface IChartLayersEditListRowProps {
    value?: IChartLayerConfig<ISupportedChartTypes>;
    onChange: (value: IChartLayerConfig<ISupportedChartTypes>) => void;
    onDelete?: () => void;
}

const getRandomColor = () => {
    const base = 200;
    const generateColorComponent = () =>
        Math.floor(Math.random() * base)
            .toString(16)
            .padStart(2, '0');
    const red = generateColorComponent();
    const green = generateColorComponent();
    const blue = generateColorComponent();
    return `#${red}${green}${blue}`;
};

const DOTS_EMABLED_TYPES: ISupportedChartTypes[] = [LinearChartType.LINE, LinearChartType.AREA];
const getInitialLayerConfig = (): IChartLayerConfig<ISupportedChartTypes> => ({
    type: LinearChartType.LINE,
    field: crypto.randomUUID(),
    color: getRandomColor(),
    source: {
        url: '/fred/series/observations',
    },
});

export const ChartLayersEditListRow: React.FC<IChartLayersEditListRowProps> = ({
    value = getInitialLayerConfig(),
    onChange,
    onDelete,
}) => {
    const dotsConfigurable = value.type && DOTS_EMABLED_TYPES.includes(value.type);

    return (
        <Stack direction={'row'} spacing={2} width={'100%'} alignItems={'center'}>
            <ChartLayerSourceSelect value={value.source} onChange={(source) => onChange({ ...value, source })} />
            <ChartLayerTypeSelect value={value?.type} onChange={(type) => onChange({ ...value, type })} />
            <Fade in={dotsConfigurable}>
                <FormControlLabel
                    label="Dots"
                    labelPlacement="start"
                    control={<Switch />}
                    value={value.dots}
                    onChange={(_, dots) => onChange({ ...value, dots })}
                    disabled={!dotsConfigurable}
                />
            </Fade>
            <Fade in={!!onDelete}>
                <IconButton onClick={onDelete} size={'small'} sx={{ marginLeft: 'auto' }}>
                    <DeleteIcon />
                </IconButton>
            </Fade>
        </Stack>
    );
};
