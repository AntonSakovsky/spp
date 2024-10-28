const monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export const getDeadlineString = (iso: string | null) => {
    if (!iso) {
        return "";
    }

    const date = new Date(iso);
    const monthIndex = date.getMonth();
    const month = monthArray[monthIndex];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
};
