import { Box, TextField, Stack } from "@mui/material";
import { SearchProps } from "../../types/props";
import DropDown from "./Dropdown";

const Search = ({
  searchTerm,
  updateSearchTerm,
  priorityFilters,
  updatePriorityFilters,
}: SearchProps) => {
  return (
    <Stack direction="row" spacing={2}>
      <TextField
        placeholder="Search"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => updateSearchTerm(e.target.value)}
        fullWidth
        sx={{ maxWidth: 400 }}
      />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <DropDown
          priorityFilters={priorityFilters}
          updatePriorityFilters={updatePriorityFilters}
        />
      </Box>
    </Stack>
  );
};

export default Search;
