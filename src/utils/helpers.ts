import { PriorityKey } from "../types/kanban";
import { Priorities } from "./constants";

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
export const getColor = (
  priority: PriorityKey
):
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning" => {
  const key = Priorities.find((p) => p.key === priority);

  if (key) return key.color;
  return "default";
};
