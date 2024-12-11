import { FormControl, Select, MenuItem } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { Priorities } from "../../utils/constants";
import Menu from "./Menu";
import { DropDownProps } from "../../types/props";

const DropDown = ({
  priorityFilters,
  updatePriorityFilters,
}: DropDownProps) => {
  return (
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
          <Menu
            key={id}
            text={priority.key}
            checked={priorityFilters.includes(priority.key)}
            onChange={(val) => {
              updatePriorityFilters(priority.key, val);
            }}
          />
        ))}
      </Select>
    </FormControl>
  );
};
export default DropDown;
