/**
 * Truncates a string to 256 characters and adds ellipsis if it exceeds the limit
 * @param text The input string to truncate
 * @returns The truncated string with ellipsis if necessary
 */
export const truncateString = (text: string): string => {
  const maxLength = 256;
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};
