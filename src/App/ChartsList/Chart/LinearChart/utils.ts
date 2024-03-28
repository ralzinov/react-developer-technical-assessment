import { IChartComponentProps } from '../../interfaces';

const getDataValues = ({ data, config }: IChartComponentProps) => {
    return data.flatMap((item) =>
        config.layers.map(({ field }) => {
            const fieldValue = item[field];
            if (!fieldValue) {
                return 0;
            }

            const value = parseFloat(item[field]);

            if (isNaN(value) && item[field] !== '.') {
                console.error(`${field} value "${item[field]}" on ${item[config.field]} is not a number`);
            }
            return isNaN(value) ? 0 : value;
        }),
    );
};

export const getMaxValue = (props: IChartComponentProps) => Math.max(...getDataValues(props));
export const getMinValue = (props: IChartComponentProps) => {
    const min = Math.min(...getDataValues(props));
    return min < 0 ? min : 0;
};

export const formatDateToYear = (date: string) => String(new Date(date).getFullYear());
export const formatFullDate = (date: string) => String(new Date(date).toLocaleDateString());
