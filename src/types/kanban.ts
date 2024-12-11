// src/types/kanban.ts
export type Column = "todo" | "doing" | "done";
export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  description?: string;
}

export type BoardState = {
  [K in Column]: Task[];
};
export interface DragItem {
  task: Task;
  sourceColumn: Column;
}
export type TaskView = Task & { status: string };
