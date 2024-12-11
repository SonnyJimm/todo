// src/types/kanban.ts
export type Column = "todo" | "doing" | "done";
export type PriorityKey = "low" | "medium" | "high";
export type Priority = {
  key: PriorityKey;
  color:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
};

export interface Task {
  id: string;
  title: string;
  priority: PriorityKey;
  description?: string;
}

export type Status = {
  column: Column;
  title: string;
};

export type BoardState = {
  [K in Column]: Task[];
};
export interface DragItem {
  task: Task;
  sourceColumn: Column;
}
export type TaskView = Task & { status: Column };
