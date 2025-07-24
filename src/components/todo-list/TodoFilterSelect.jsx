// React Imports
import { useState } from "react";
import PropTypes from "prop-types";

// MUI Imports
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Divider from "@mui/material/Divider";
// Components
import TooltipIconButton from "../ui/TooltipIconButton";

const FILTER_OPTIONS = (t) => [
  { value: "all", label: t.all },
  { value: "completed", label: t.completed },
  { value: "incomplete", label: t.incomplete },
];

const TodoFilterSelect = ({
  todos,
  filterValue,
  filterUser,
  onFilterChange,
  onChangeUser,
  // options = FILTER_OPTIONS(), // Old options
  dictionary,
  ...props
}) => {
  // States
  const [anchorEl, setAnchorEl] = useState(null);
  const options = FILTER_OPTIONS(dictionary); // New options

  const getUsers = () => {
    const users = todos.map((todo) => todo.createdBy);
    return Array.from(new Set(users));
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    if (value !== filterValue) {
      onFilterChange(value);
    }
    // handleClose();
  };

  return (
    <>
      <TooltipIconButton
        aria-controls="todo-filter-menu"
        aria-haspopup="true"
        title="Filter Todos"
        iconClass="sm-filter-line"
        variant="outlined"
        onClick={handleOpen}
        {...props}
      />
      <Menu
        id="todo-filter-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem disableRipple>
          {options.map((option) => (
            <RadioGroup
              key={option.value}
              value={filterValue}
              onChange={handleChange}
            >
              <FormControlLabel
                value={option.value}
                control={<Radio />}
                label={option.label}
                sx={{ mx: 0 }}
              />
            </RadioGroup>
          ))}
        </MenuItem>
        <Divider className="mb-1" />
        <MenuItem>
          <div className="form-group">
            <label htmlFor="users">{dictionary.createdBy}</label>
            <select
              name="users"
              className="form-control"
              value={filterUser}
              onChange={onChangeUser}
            >
              <option value="">All Users</option>
              {getUsers().map((user) => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>
        </MenuItem>
      </Menu>
    </>
  );
};

TodoFilterSelect.propTypes = {
  filterValue: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TodoFilterSelect;
