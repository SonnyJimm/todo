// src/components/KanbanBoard.tsx
import React, { useState, useCallback } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Stack,
  Container,
  Grid,
  CssBaseline,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import {
  Task,
  Column,
  BoardState,
  TaskView,
  PriorityKey,
} from "./types/kanban";
import BoardList from "./components/BoardList";
import ViewModal from "./components/ViewModal";

const KanbanBoard: React.FC = () => {
  const [newTask, setNewTask] = useState("");
  const [boards, setBoards] = useState<BoardState>({
    todo: [
      {
        id: "1",
        title: "Research project requirements",
        priority: "medium",
        description: "Check the project requirements and prepare a plan.",
      },
    ],
    doing: [],
    done: [],
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskView | null>(null);

  const handleTaskMove = useCallback(
    (taskId: string, source: Column, target: Column) => {
      setSelectedTask((prev) => {
        if (prev && source !== target && prev.id === taskId) {
          return {
            ...prev,
            status: target,
          };
        }
        return null;
      });
      setBoards((prev) => {
        const task = prev[source].find((t) => t.id === taskId);
        console.log("task", task);
        if (source === target || !task) return prev;

        return {
          ...prev,
          [source]: prev[source].filter((t) => t.id !== taskId),
          [target]: [...prev[target], task],
        };
      });
    },
    []
  );
  const handleTaskPriorityUpdate = useCallback(
    (taskId: string, column: Column, newPriority: PriorityKey) => {
      setSelectedTask((prev) => {
        if (prev && prev.id === taskId) {
          return {
            ...prev,
            priority: newPriority,
          };
        }
        return null;
      });
      setBoards((prev) => ({
        ...prev,
        [column]: prev[column].map((task) =>
          task.id === taskId ? { ...task, priority: newPriority } : task
        ),
      }));
    },
    []
  );
  const handleTaskTitleUpdate = useCallback(
    (taskId: string, column: Column, newTitle: string) => {
      if (!newTitle.trim()) return;
      setSelectedTask((prev) => {
        if (prev && prev.id === taskId) {
          return {
            ...prev,
            title: newTitle,
          };
        }
        return null;
      });
      setBoards((prev) => ({
        ...prev,
        [column]: prev[column].map((task) =>
          task.id === taskId ? { ...task, title: newTitle } : task
        ),
      }));
    },
    []
  );
  const handleTaskDescriptionUpdate = useCallback(
    (taskId: string, column: Column, newDescription: string) => {
      if (!newDescription.trim()) return;
      setSelectedTask((prev) => {
        if (prev && prev.id === taskId) {
          return {
            ...prev,
            description: newDescription,
          };
        }
        return null;
      });
      setBoards((prev) => ({
        ...prev,
        [column]: prev[column].map((task) =>
          task.id === taskId ? { ...task, description: newDescription } : task
        ),
      }));
    },
    []
  );
  const handleTaskDelete = useCallback((taskId: string, column: Column) => {
    setBoards((prev) => ({
      ...prev,
      [column]: prev[column].filter((task) => task.id !== taskId),
    }));
  }, []);

  const addNewTask = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!newTask.trim()) return;

      const task: Task = {
        id: Date.now().toString(),
        title: newTask,
        priority: "medium",
        description: "",
      };

      setBoards((prev) => ({
        ...prev,
        todo: [...prev.todo, task],
      }));
      setNewTask("");
    },
    [newTask]
  );
  const onCloseModal = useCallback(() => {
    setIsModalVisible(false);
    setSelectedTask(null);
  }, []);
  const onOpenModal = useCallback((data: TaskView) => {
    setSelectedTask(data);
    setIsModalVisible(true);
  }, []);
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <CssBaseline />
      <ViewModal
        handleTaskMove={handleTaskMove}
        isOpen={isModalVisible}
        onClose={() => {
          onCloseModal();
        }}
        handleDescriptionChange={handleTaskDescriptionUpdate}
        handlePriorityUpdate={handleTaskPriorityUpdate}
        handleTitleChange={handleTaskTitleUpdate}
        data={selectedTask}
      />
      <Typography variant="h4" sx={{ mb: 4 }}>
        Kanban Board
      </Typography>

      <Box component="form" onSubmit={addNewTask} sx={{ mb: 4 }}>
        <Stack direction="row" spacing={2}>
          <TextField
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            variant="outlined"
            size="small"
            fullWidth
            sx={{ maxWidth: 400 }}
          />
          <Button type="submit" variant="contained" startIcon={<AddIcon />}>
            Add Task
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <BoardList
            title="To Do"
            tasks={boards.todo}
            listKey="todo"
            onViewTask={onOpenModal}
            color="primary.main"
            onUpdateTask={(task) => {}}
            onTaskMove={handleTaskMove}
            onTaskDelete={handleTaskDelete}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <BoardList
            title="In Progress"
            tasks={boards.doing}
            listKey="doing"
            onViewTask={onOpenModal}
            color="warning.main"
            onUpdateTask={(task) => {}}
            onTaskMove={handleTaskMove}
            onTaskDelete={handleTaskDelete}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <BoardList
            title="Done"
            tasks={boards.done}
            listKey="done"
            onViewTask={onOpenModal}
            color="success.main"
            onUpdateTask={(task) => {}}
            onTaskMove={handleTaskMove}
            onTaskDelete={handleTaskDelete}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default KanbanBoard;
