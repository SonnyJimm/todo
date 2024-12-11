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
  FormHelperText,
} from "@mui/material";
import { useFormik } from "formik";
import { PriorityKey } from "../types/kanban";
import { Priorities } from "../utils/constants";
import { validationSchema } from "../utils/helpers";
import { NewTaskModalProps } from "../types/props";
import { ModelStyle } from "../styles/model.style";

const NewTaskModal = ({
  isOpen,
  onClose,
  onSubmit,
  listKey,
  title,
}: NewTaskModalProps) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      priority: "low" as PriorityKey,
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values, listKey);
      close();
    },
  });
  const close = () => {
    formik.resetForm({
      values: {
        title: "",
        priority: "low" as PriorityKey,
        description: "",
      },
    });
    onClose();
  };
  return (
    <Modal
      open={isOpen}
      onClose={() => {
        close();
      }}
      aria-labelledby="task-modal-title"
      aria-describedby="task-modal-description"
    >
      <Box
        sx={ModelStyle.formWrapper}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <FormControl
          variant="standard"
          fullWidth
          error={formik.touched.title && Boolean(formik.errors.title)}
        >
          <InputLabel htmlFor="title">Title</InputLabel>
          <Input
            id="title"
            name="title"
            fullWidth
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.touched.title && formik.errors.title && (
            <FormHelperText>{formik.errors.title}</FormHelperText>
          )}
        </FormControl>

        <Box sx={ModelStyle.statusWrapper}>
          <FormControl variant="standard" size="small" disabled>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              name="status"
              value={listKey}
            >
              <MenuItem value={listKey}>{title}</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            variant="standard"
            size="small"
            error={formik.touched.priority && Boolean(formik.errors.priority)}
          >
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              id="priority"
              name="priority"
              value={formik.values.priority}
              onChange={formik.handleChange}
            >
              {Priorities.map((priority, id) => (
                <MenuItem key={id} value={priority.key}>
                  <Chip
                    label={priority.key}
                    size="small"
                    color={priority.color}
                  />
                </MenuItem>
              ))}
            </Select>
            {formik.touched.priority && formik.errors.priority && (
              <FormHelperText>{formik.errors.priority}</FormHelperText>
            )}
          </FormControl>
        </Box>

        <FormControl
          variant="standard"
          fullWidth
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
        >
          <InputLabel htmlFor="description">Description</InputLabel>
          <Input
            id="description"
            name="description"
            fullWidth
            multiline
            minRows={2}
            maxRows={10}
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          {formik.touched.description && formik.errors.description && (
            <FormHelperText>{formik.errors.description}</FormHelperText>
          )}
        </FormControl>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Button onClick={close}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Create Task
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewTaskModal;
