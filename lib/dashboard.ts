export function calculateWeeklyChange(
  lastWeekTotal: number,
  currentWeekTotal: number
): string {
  if (lastWeekTotal === 0) {
    return currentWeekTotal > 0 ? "+100" : "0"; // Special case for 100% gain if last week was zero
  }

  const difference = currentWeekTotal - lastWeekTotal;
  const percentageChange = (difference / lastWeekTotal) * 100;

  // Format the result with a "+" sign for positive values
  return percentageChange > 0 ? `+${percentageChange}` : `${percentageChange}`;
}
