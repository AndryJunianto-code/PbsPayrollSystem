const getMonthYear = (date) => {
  const dateObj = new Date(date);

  // Get the month abbreviation and year
  const monthAbbreviation = dateObj.toLocaleString('default', { month: 'short' });
  const year = dateObj.getFullYear();

  // Concatenate the month abbreviation and year
  const result = monthAbbreviation + year;

  return result;
}

export default getMonthYear;