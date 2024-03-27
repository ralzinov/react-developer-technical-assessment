const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const getYearDate = (offset: number) => {
    const currentYear = new Date().getFullYear();
    const date = new Date(currentYear + offset, 0);
    return formatDate(date);
};
