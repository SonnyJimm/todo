import { MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import { MenuProps } from "../../types/props";

const Menu = ({ text, checked, onChange }: MenuProps) => {
  return (
    <MenuItem>
      <FormControlLabel
        checked={checked}
        control={<Checkbox />}
        onChange={() => {
          onChange(!checked);
        }}
        label={text}
        value={text}
      />
    </MenuItem>
  );
};
export default Menu;
