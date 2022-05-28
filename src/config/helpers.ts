export const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

export const generateUniqueColor = () => (
    '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
);

export const generateUniqueColors = (num: number) => (
    new Array(num).fill(0).map(() => generateUniqueColor())
);

export const getArrangedMonths = (): string[] => (months);
