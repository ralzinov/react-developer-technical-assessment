import { IChartComponentProps } from '../../interfaces';

export const getMaxValue = ({ data, config }: IChartComponentProps) => {
    return Math.max(
        ...data.map((item) =>
            Math.max(
                ...config.layers.map(({ field }) => {
                    const fieldValue = item[field];
                    if (!fieldValue) {
                        return 0;
                    }

                    const value = parseFloat(item[field]);
                    if (isNaN(value)) {
                        console.error(`${field} value "${item[field]}" on ${item[config.field]} is not a number`);
                    }
                    return isNaN(value) ? 0 : value;
                }),
            ),
        ),
    );
};

export const formatDateToYear = (date: string) => String(new Date(date).getFullYear());
export const formatFullDate = (date: string) => String(new Date(date).toLocaleDateString());
