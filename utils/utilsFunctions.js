export function getCurrentYearMonths() {
  const months = [
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
    "Dec",
  ];
  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth();
  return months.slice(0, currentMonthIndex + 1);
}