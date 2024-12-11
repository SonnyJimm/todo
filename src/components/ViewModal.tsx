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
import { Column, PriorityKey } from "../types/kanban";
import { Priorities, Statuses } from "../utils/constants";
import { ModelStyle } from "../styles/model.style";
import { ViewModalProps } from "../types/props";

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
      <Box sx={ModelStyle.formWrapper}>
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
        <Box sx={ModelStyle.statusWrapper}>
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
