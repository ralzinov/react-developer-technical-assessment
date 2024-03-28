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
