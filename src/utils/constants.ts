import { Priority, Status } from "../types/kanban";

export const Priorities: Readonly<Priority[]> = [
  { key: "low", color: "success" },
  { key: "medium", color: "warning" },
  { key: "high", color: "error" },
] as const;
export const Statuses: Readonly<Status[]> = [
  {
    column: "todo",
    title: "To Do",
  },
  {
    column: "doing",
    title: "In Progress",
  },
  {
    column: "done",
    title: "Done",
  },
] as const;
