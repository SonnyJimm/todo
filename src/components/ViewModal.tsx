import { Box, Chip, IconButton, Modal, Typography } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { Task, TaskView } from "../types/kanban";
interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: TaskView | null;
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
const ViewModal = ({ isOpen, onClose, data }: ViewModalProps) => {
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
        <Typography color="text.secondary">Status:{data.status}</Typography>
        <Box
          sx={{
            display: "flex",
            textAlign: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography color="text.secondary">Priority:</Typography>
            <Chip
              style={{ marginTop: "0px" }}
              label={data.priority}
              size="small"
              color={
                data.priority === "high"
                  ? "error"
                  : data.priority === "medium"
                  ? "warning"
                  : "default"
              }
              sx={{ mt: 1 }}
            />
          </Box>
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
