import { IChartLayerConfig, LayerCurveType } from './ChartsList/interfaces';
import { ISupportedChartTypes } from './ChartsList/Chart';
import { LinearChartType } from './ChartsList/Chart/LinearChart';

export const joinQueryParams = (params: Record<string, string | number>) => {
    const entries = Object.entries(params).filter(([, value]) => value !== null && value !== undefined);
    if (entries.length > 0) {
        return `?${entries.map(([key, value]) => `${key}=${value}`).join('&')}`;
    }
    return '';
};

export const getRandomColor = () => {
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

export const getInitialLayerConfig = (): IChartLayerConfig<ISupportedChartTypes> => ({
    type: LinearChartType.LINE,
    field: crypto.randomUUID(),
    color: getRandomColor(),
    curveType: LayerCurveType.SMOOTH,
    source: {
        url: '/fred/series/observations',
    },
});
