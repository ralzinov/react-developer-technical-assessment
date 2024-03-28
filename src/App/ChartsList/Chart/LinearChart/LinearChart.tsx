import React from 'react';
import { CartesianGrid, ComposedChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatDateToYear, getMaxValue, getMinValue } from './utils.ts';
import { IChartComponentProps } from '../../interfaces';
import { getChartLayers } from './getChartLayers.tsx';
import { renderLegend } from './renderLegend.tsx';
import { renderTooltip } from './LinearChartTooltip.tsx';

export const LinearChart: React.FC<IChartComponentProps> = ({ config, data }) => {
    return (
        <ResponsiveContainer minHeight={400}>
            <ComposedChart data={data}>
                <XAxis dataKey={config.field} tickFormatter={formatDateToYear} />
                <YAxis domain={[getMinValue({ data, config }), getMaxValue({ data, config })]} scale={'sqrt'} />
                <CartesianGrid stroke="#f5f5f5" />
                {...getChartLayers(config.layers)}
                <Tooltip content={renderTooltip} />
                <Legend content={renderLegend} />
            </ComposedChart>
        </ResponsiveContainer>
    );
};
