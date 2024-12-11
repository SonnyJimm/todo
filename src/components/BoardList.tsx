import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { Column, DragItem, Task, TaskView } from "../types/kanban";
import { styled } from "@mui/material/styles";
import { Delete as DeleteIcon, RemoveRedEye } from "@mui/icons-material";
import { getColor, truncateString } from "../utils/helpers";
import { useState } from "react";
import NewModal from "./NewModal";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(2),
  height: "75vh",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));
const StyledList = styled(Box)(({ theme }) => ({
  overflowY: "scroll",
}));

interface BoardListProps {
  title: string;
  tasks: Task[];
  listKey: Column;
  color: string;
  onViewTask: (task: TaskView) => void;
  onTaskMove: (taskId: string, source: Column, target: Column) => void;
  onTaskDelete: (taskId: string, column: Column) => void;
  onAddTask: (e: Omit<Task, "id">, column: Column) => void;
}

const BoardList: React.FC<BoardListProps> = ({
  title,
  tasks,
  listKey,
  color,
  onTaskMove,
  onViewTask,
  onTaskDelete,
  onAddTask,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: Task) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        task,
        sourceColumn: listKey,
      } as DragItem)
    );
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      const data = JSON.parse(
        e.dataTransfer.getData("application/json")
      ) as DragItem;
      onTaskMove(data.task.id, data.sourceColumn, listKey);
    } catch (error) {
      console.error("Drop error:", error);
    }
  };
  const openModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <StyledPaper
      onDragOver={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
      onDrop={handleDrop}
      elevation={0}
    >
      <NewModal
        isOpen={isModalVisible}
        onClose={closeModal}
        title={title}
        listKey={listKey}
        onSubmit={(task) => {
          onAddTask(task, listKey);
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            display: "flex",
            flex: 1,

            alignItems: "flex-end",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: color,
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
          <IconButton size="small" color="primary" onClick={openModal}>
            <AddIcon />
          </IconButton>
        </Box>
      </Box>

      <StyledList>
        <Stack spacing={2}>
          {tasks.map((task) => (
            <Card
              key={task.id}
              draggable
              onDragStart={(e) => handleDragStart(e, task)}
              sx={{
                cursor: "move",
                "&:hover": {
                  boxShadow: 3,
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{task.title}</Typography>
                    <Chip
                      label={task.priority}
                      size="small"
                      color={getColor(task.priority)}
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  <IconButton
                    size="small"
                    onClick={() => onViewTask({ ...task, status: listKey })}
                    color="default"
                  >
                    <RemoveRedEye fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onTaskDelete(task.id, listKey)}
                    color="error"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Box mt={2}>
                  <Typography variant="body1">
                    {truncateString(task.description || "No description")}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </StyledList>
    </StyledPaper>
  );
};
export default BoardList;
