
const getWeekNumber = (selectedDate) => {
    const d = new Date(selectedDate);
    d.setHours(0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);

    const weekNumber = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return weekNumber + " " + d.getFullYear();
}

export default getWeekNumber;