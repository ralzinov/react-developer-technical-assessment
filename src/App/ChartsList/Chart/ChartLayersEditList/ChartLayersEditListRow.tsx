import React from 'react';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import { Fade, FormControlLabel, IconButton, Switch } from '@mui/material';
import { ChartLayerSourceSelect } from './ChartLayerSourceSelect.tsx';
import { ChartLayerColorSelect } from './ChartLayerColorSelect.tsx';
import { ChartLayerTypeSelect } from './ChartLayerTypeSelect.tsx';
import { IChartLayerConfig } from '../../interfaces';
import { ISupportedChartTypes } from '../Chart.tsx';
import { LinearChartType } from '../LinearChart';
import { ChartLayerCurveStyleSelect } from './ChartLayerCurveStyleSelect.tsx';

interface IChartLayersEditListRowProps {
    value: IChartLayerConfig<ISupportedChartTypes>;
    onChange: (value: IChartLayerConfig<ISupportedChartTypes>) => void;
    onDelete: () => void;
}

const DOTS_EMABLED_TYPES: ISupportedChartTypes[] = [LinearChartType.LINE, LinearChartType.AREA];

export const ChartLayersEditListRow: React.FC<IChartLayersEditListRowProps> = ({ value, onChange, onDelete }) => {
    const dotsConfigurable = value.type && DOTS_EMABLED_TYPES.includes(value.type);

    return (
        <Stack direction={'row'} spacing={2} width={'100%'} alignItems={'center'}>
            <ChartLayerSourceSelect value={value.source} onChange={(source) => onChange({ ...value, source })} />
            <ChartLayerTypeSelect value={value?.type} onChange={(type) => onChange({ ...value, type })} />
            <ChartLayerCurveStyleSelect
                value={value?.curveType}
                onChange={(curveType) => onChange({ ...value, curveType })}
            />
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
            <ChartLayerColorSelect value={value.color} onChange={(color) => onChange({ ...value, color })} />
            <IconButton onClick={onDelete} size={'small'} sx={{ marginLeft: 'auto' }}>
                <DeleteIcon />
            </IconButton>
        </Stack>
    );
};
