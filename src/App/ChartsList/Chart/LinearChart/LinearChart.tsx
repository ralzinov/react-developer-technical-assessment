import React from 'react';
import {
    Area,
    Bar,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { IChartComponentProps } from '../../interfaces';
import { LinearChartType } from './LinearChart.const';
import { formatDateToYear, getMaxValue } from './utils.ts';

const getChartLayers = (layers: IChartComponentProps['config']['layers']) =>
    layers.map((layerConfig) => {
        switch (layerConfig.type) {
            case LinearChartType.LINE: {
                return (
                    <Line
                        key={layerConfig.field}
                        connectNulls
                        type="monotone"
                        dataKey={layerConfig.field}
                        name={layerConfig.name}
                        isAnimationActive={false}
                        stroke={layerConfig.color}
                        dot={layerConfig.dots}
                    />
                );
            }
            case LinearChartType.AREA: {
                return (
                    <Area
                        key={layerConfig.field}
                        name={layerConfig.name}
                        connectNulls
                        type="monotone"
                        dataKey={layerConfig.field}
                        isAnimationActive={false}
                        fill={layerConfig.color}
                        stroke={layerConfig.color}
                        dot={layerConfig.dots}
                    />
                );
            }
            case LinearChartType.COLUMNS: {
                return (
                    <Bar
                        key={layerConfig.field}
                        name={layerConfig.name}
                        dataKey={layerConfig.field}
                        isAnimationActive={false}
                        barSize={20}
                        fill={layerConfig.color}
                    />
                );
            }

            default: {
                throw new Error(`${layerConfig.type} type is not supported`);
            }
        }
    });

export const LinearChart: React.FC<IChartComponentProps> = ({ config, data }) => {
    return (
        <ResponsiveContainer minHeight={400}>
            <ComposedChart data={data}>
                <XAxis dataKey={config.field} tickFormatter={formatDateToYear} />
                <YAxis domain={[0, getMaxValue({ data, config }) + 1000]} scale={'sqrt'} />
                <CartesianGrid stroke="#f5f5f5" />
                {...getChartLayers(config.layers)}
                <Tooltip />
                <Legend />
            </ComposedChart>
        </ResponsiveContainer>
    );
};
