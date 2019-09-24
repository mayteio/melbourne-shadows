export function destructureDate(date, includeHour = false) {
  const parts = [date.getFullYear(), date.getMonth(), date.getDate()];
  if (includeHour) parts.push(date.getHours());
  return parts;
}
