import { PriorityKey } from "../types/kanban";
import { Priorities } from "./constants";
import * as Yup from "yup";
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

export const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be less than 50 characters"),
  priority: Yup.string()
    .required("Priority is required")
    .oneOf(Priorities.map((priority) => priority.key)),
  description: Yup.string()
    .max(1000, "Description must be less than 1000 characters")
    .required("Description is required"),
});
