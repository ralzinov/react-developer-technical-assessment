import React from 'react';
import { CartesianGrid, ComposedChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatDateToYear, formatNumber, getMaxValue, getMinValue } from './utils.ts';
import { IChartComponentProps } from '../../interfaces';
import { getChartLayers } from './getChartLayers.tsx';
import { renderLegend } from './renderLegend.tsx';
import { renderTooltip } from './LinearChartTooltip.tsx';

export const LinearChart: React.FC<IChartComponentProps> = ({ config, data }) => {
    const maxValue = Math.max(getMaxValue({ data, config }), config.yAxisTicks || 1);

    return (
        <ResponsiveContainer minHeight={400}>
            <ComposedChart data={data}>
                <Legend content={renderLegend} />
                <Tooltip content={renderTooltip} />
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey={config.field} tickFormatter={formatDateToYear} />
                <YAxis
                    domain={[getMinValue({ data, config }), maxValue]}
                    scale={config.scale}
                    tickCount={config.yAxisTicks}
                    tickFormatter={formatNumber}
                />
                {...getChartLayers(config.layers)}
            </ComposedChart>
        </ResponsiveContainer>
    );
};
