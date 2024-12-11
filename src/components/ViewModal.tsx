import {
  Box,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { Column, Priority, PriorityKey, Task, TaskView } from "../types/kanban";
import { Priorities, Statuses } from "../utils/constants";
interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: TaskView | null;
  handleTaskMove: (taskId: string, source: Column, target: Column) => void;
  handlePriorityUpdate: (
    taskId: string,
    column: Column,
    newPriority: PriorityKey
  ) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};
const ViewModal = ({
  isOpen,
  onClose,
  data,
  handleTaskMove,
  handlePriorityUpdate,
}: ViewModalProps) => {
  if (!data) return <></>;
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="task-modal-title"
      aria-describedby="task-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          {data.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "5px",
            marginTop: 2,
            alignItems: "flex-end",
          }}
        >
          <FormControl variant="standard" size="small">
            <InputLabel id="modal-select-status">Status</InputLabel>
            <Select
              value={data.status}
              label="Status"
              labelId="modal-select-status"
              onChange={(value: SelectChangeEvent) => {
                handleTaskMove(
                  data.id,
                  data.status,
                  value.target.value as Column
                );
              }}
            >
              {Statuses.map((status, id) => (
                <MenuItem key={id} value={status.column}>
                  {status.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="standard" size="small">
            <InputLabel id="modal-select-priority">Priority</InputLabel>
            <Select
              value={data.priority}
              label="Priority"
              id="modal-select-priority"
              onChange={(value: SelectChangeEvent) => {
                handlePriorityUpdate(
                  data.id,
                  data.status,
                  value.target.value as PriorityKey
                );
              }}
            >
              {Priorities.map((priority, id) => (
                <MenuItem key={id} value={priority.key}>
                  <Chip
                    style={{ marginTop: "0px" }}
                    label={priority.key}
                    size="small"
                    color={priority.color}
                    sx={{ mt: 1 }}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Typography sx={{ mt: 2 }}>{data.description}</Typography>

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <IconButton size="small" onClick={() => {}} color="default">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => {}} color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};
export default ViewModal;
