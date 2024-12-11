import { Column, PriorityKey, Task, TaskView } from "./kanban";

export interface BoardListProps {
  title: string;
  tasks: Task[];
  listKey: Column;
  color: string;
  onViewTask: (task: TaskView) => void;
  onTaskMove: (taskId: string, source: Column, target: Column) => void;
  onTaskDelete: (taskId: string, column: Column) => void;
  onAddTask: (e: Omit<Task, "id">, column: Column) => void;
}

export interface NewTaskModalProps {
  isOpen: boolean;
  title: string;
  listKey: Column;
  onClose: () => void;
  onSubmit: (task: Omit<Task, "id">, listKey: Column) => void;
}

export interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: TaskView | null;
  handleTaskMove: (taskId: string, source: Column, target: Column) => void;
  handlePriorityUpdate: (
    taskId: string,
    column: Column,
    newPriority: PriorityKey
  ) => void;
  handleTitleChange: (taskId: string, column: Column, newTitle: string) => void;
  handleDescriptionChange: (
    taskId: string,
    column: Column,
    newDescription: string
  ) => void;
}

export interface MenuProps {
  checked: boolean;
  text: string;
  onChange: (value: boolean) => void;
}

export interface DropDownProps {
  priorityFilters: PriorityKey[];
  updatePriorityFilters(key: PriorityKey, value: boolean): void;
}

export interface SearchProps {
  searchTerm: string;
  updateSearchTerm: (value: string) => void;
  priorityFilters: PriorityKey[];
  updatePriorityFilters(key: PriorityKey, value: boolean): void;
}
