import { IChartComponentProps } from '../../interfaces';
import { LinearChartType } from './LinearChart.const.ts';
import { Area, Bar, Line } from 'recharts';
import { hasSeriesId } from '../utils.ts';

export const getChartLayers = (layers: IChartComponentProps['config']['layers']) =>
    layers
        .filter(({ source }) => hasSeriesId(source))
        .map((layerConfig) => {
            switch (layerConfig.type) {
                case LinearChartType.LINE: {
                    return (
                        <Line
                            key={layerConfig.field}
                            type={layerConfig.curveType}
                            dataKey={layerConfig.field}
                            name={layerConfig.source.name}
                            isAnimationActive={false}
                            stroke={layerConfig.color}
                            dot={!!layerConfig.dots}
                            unit={layerConfig.source.unit}
                            connectNulls
                        />
                    );
                }
                case LinearChartType.AREA: {
                    return (
                        <Area
                            key={layerConfig.field}
                            name={layerConfig.source.name}
                            type={layerConfig.curveType}
                            dataKey={layerConfig.field}
                            isAnimationActive={false}
                            fill={layerConfig.color}
                            stroke={layerConfig.color}
                            dot={!!layerConfig.dots}
                            unit={layerConfig.source.unit}
                            connectNulls
                        />
                    );
                }
                case LinearChartType.COLUMNS: {
                    return (
                        <Bar
                            key={layerConfig.field}
                            name={layerConfig.source.name}
                            dataKey={layerConfig.field}
                            isAnimationActive={false}
                            barSize={20}
                            fill={layerConfig.color}
                            unit={layerConfig.source.unit}
                        />
                    );
                }

                default: {
                    throw new Error(`${layerConfig.type} type is not supported`);
                }
            }
        });
