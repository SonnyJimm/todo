import {
  Box,
  Button,
  Chip,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Column, PriorityKey, TaskView } from "../types/kanban";
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
  handleTitleChange: (taskId: string, column: Column, newTitle: string) => void;
  handleDescriptionChange: (
    taskId: string,
    column: Column,
    newDescription: string
  ) => void;
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  gap: 2,
  flexDirection: "column",
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
  handleTitleChange,
  handleDescriptionChange,
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
        <FormControl variant="standard" fullWidth>
          <InputLabel htmlFor="component-simple">Title</InputLabel>
          <Input
            fullWidth
            id="component-simple"
            onFocus={(e) => {
              e.currentTarget.value = data.title;
            }}
            onBlur={(e) => {
              if (
                e.currentTarget.value === "" &&
                e.currentTarget.value === data.title
              ) {
                e.currentTarget.value = data.title;
                return;
              }
              handleTitleChange(data.id, data.status, e.currentTarget.value);
            }}
            defaultValue={data.title}
          />
        </FormControl>
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
        <FormControl variant="standard" fullWidth>
          <InputLabel htmlFor="modal-input-description">Description</InputLabel>
          <Input
            fullWidth
            id="modal-input-description"
            multiline
            minRows={2}
            maxRows={10}
            onFocus={(e) => {
              e.currentTarget.value = data?.description ?? "";
            }}
            onBlur={(e) => {
              if (
                e.currentTarget.value === "" &&
                e.currentTarget.value === data.description
              ) {
                e.currentTarget.value = data.description;
                return;
              }
              handleDescriptionChange(
                data.id,
                data.status,
                e.currentTarget.value
              );
            }}
            defaultValue={data.description}
          />
        </FormControl>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column-reverse",
            gap: 2,
            mt: 2,
          }}
        >
          <Button onClick={onClose}>Close</Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default ViewModal;
