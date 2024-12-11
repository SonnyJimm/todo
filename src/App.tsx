import React, {
  useState,
  useCallback,
  useDeferredValue,
  useEffect,
} from "react";

import {
  Typography,
  Box,
  TextField,
  Stack,
  Container,
  Grid,
  CssBaseline,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import {
  Task,
  Column,
  BoardState,
  TaskView,
  PriorityKey,
} from "./types/kanban";
import BoardList from "./components/BoardList";
import ViewModal from "./components/ViewModal";
import { Priorities } from "./utils/constants";

const KanbanBoard: React.FC = () => {
  const [initBoard, setInitBoard] = useState<BoardState>({
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
  const [boards, setBoards] = useState<BoardState>(initBoard);
  const [searchTerm, setSearchTerm] = useState("");
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const [priorityFilters, setPriorityFilters] = useState<PriorityKey[]>([
    "low",
    "medium",
    "high",
  ]);
  useEffect(() => {
    if (!deferredSearchTerm && priorityFilters.length === 3) {
      setBoards(initBoard);
      return;
    }
    const filterfn = (task: Task) =>
      task.title.toLowerCase().includes(deferredSearchTerm.toLowerCase()) &&
      priorityFilters.includes(task.priority);
    const filteredBoard = {
      todo: initBoard.todo.filter(filterfn),
      doing: initBoard.doing.filter(filterfn),
      done: initBoard.done.filter(filterfn),
    };
    console.log("filter", priorityFilters);
    setBoards(filteredBoard);
  }, [deferredSearchTerm, priorityFilters, initBoard]);
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
      setInitBoard((prev) => {
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
      setInitBoard((prev) => ({
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
      setInitBoard((prev) => ({
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
      setInitBoard((prev) => ({
        ...prev,
        [column]: prev[column].map((task) =>
          task.id === taskId ? { ...task, description: newDescription } : task
        ),
      }));
    },
    []
  );
  const handleTaskDelete = useCallback((taskId: string, column: Column) => {
    setInitBoard((prev) => ({
      ...prev,
      [column]: prev[column].filter((task) => task.id !== taskId),
    }));
  }, []);

  const addNewTask = useCallback((e: Omit<Task, "id">, column: Column) => {
    setInitBoard((prev) => ({
      ...prev,
      [column]: [{ id: Date.now().toString(), ...e }, ...prev[column]],
    }));
  }, []);
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

      <Box sx={{ mb: 4 }}>
        <Stack direction="row" spacing={2}>
          <TextField
            placeholder="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            sx={{ maxWidth: 400 }}
          />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FormControl size="small">
              <Select
                multiple
                displayEmpty
                value={[""]}
                sx={{ minWidth: 120 }}
                startAdornment={<SearchIcon sx={{ mr: 1 }} />}
              >
                <MenuItem value="">Filters</MenuItem>
                {Priorities.map((priority, id) => (
                  <MenuItem key={id}>
                    <FormControlLabel
                      checked={priorityFilters.includes(priority.key)}
                      control={<Checkbox />}
                      onChange={() => {
                        setPriorityFilters((prev) => {
                          return priorityFilters.includes(priority.key)
                            ? prev.filter((p) => p !== priority.key)
                            : [...prev, priority.key];
                        });
                      }}
                      label={priority.key}
                      value={priority.key}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <BoardList
            title="To Do"
            tasks={boards.todo}
            onAddTask={addNewTask}
            listKey="todo"
            onViewTask={onOpenModal}
            color="primary.main"
            onTaskMove={handleTaskMove}
            onTaskDelete={handleTaskDelete}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <BoardList
            title="In Progress"
            tasks={boards.doing}
            listKey="doing"
            onAddTask={addNewTask}
            onViewTask={onOpenModal}
            color="warning.main"
            onTaskMove={handleTaskMove}
            onTaskDelete={handleTaskDelete}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <BoardList
            title="Done"
            tasks={boards.done}
            listKey="done"
            onAddTask={addNewTask}
            onViewTask={onOpenModal}
            color="success.main"
            onTaskMove={handleTaskMove}
            onTaskDelete={handleTaskDelete}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default KanbanBoard;
