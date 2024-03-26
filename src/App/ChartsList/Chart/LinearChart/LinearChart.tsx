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
    YAxis
} from 'recharts';
import { IChartComponentProps } from '../../interfaces';
import { LinearChartType } from './LinearChart.const';

const getMaxValue = ({ data, config }: IChartComponentProps) => {
    return Math.max(
        ...data.map((item) => Math.max(...config.layers.map(({ field }) => {
            const fieldValue = item[field];
            if (!fieldValue) {
                return 0;
            }

            const value = parseFloat(item[field]);
            if (isNaN(value)) {
                console.error(`${field} value "${item[field]}" on ${item[config.field]} is not a number`);
            }
            return isNaN(value) ? 0 : value;
        })))
    );
};

export const LinearChart: React.FC<IChartComponentProps> = ({ config, data }) => {
    return (
        <ResponsiveContainer minHeight={400}>
            <ComposedChart data={data}>
                <XAxis dataKey={config.field} />
                <YAxis domain={[0, getMaxValue({ data, config }) + 1000]} scale={'sqrt'} />
                <CartesianGrid stroke="#f5f5f5" />
                {config.layers.map((item) => {
                    switch (item.type) {
                        case LinearChartType.LINE: {
                            return <Line key={item.type} connectNulls type="monotone" dataKey={item.field}
                                         stroke="#ff7300" />;
                        }
                        case LinearChartType.AREA: {
                            return <Area key={item.type} connectNulls type="monotone" dataKey={item.field}
                                         fill="#8884d8"
                                         stroke="#8884d8" />;
                        }
                        case LinearChartType.COLUMNS: {
                            return <Bar key={item.type} dataKey={item.field} barSize={20} fill="#413ea0" />;
                        }

                        default: {
                            throw new Error(`${item.type} type is not supported`);
                        }
                    }
                })}
                <Tooltip />
                <Legend />
            </ComposedChart>
        </ResponsiveContainer>
    );
};
