export const joinQueryParams = (params: Record<string, string | number>) => {
    const entries = Object.entries(params).filter(([, value]) => value !== null && value !== undefined);
    if (entries.length > 0) {
        return `?${entries.map(([key, value]) => `${key}=${value}`).join('&')}`;
    }
    return '';
};
