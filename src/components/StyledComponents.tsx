import { Paper, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
export const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(2),
  height: "75vh",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));
export const StyledList = styled(Box)(({ theme }) => ({
  overflowY: "scroll",
}));
