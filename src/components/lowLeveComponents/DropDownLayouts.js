import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ThemeContext from "../../context/themesContext/themeContext"

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 250,
  },
}));

export default function DropDownLayouts({
  label,
  value,
  name,
  pageLayouts,
  handleChangeDropdown,
}) {
  const classes = useStyles();

  const themeContext = useContext(ThemeContext);

  return (
    < div >
      <FormControl className={classes.formControl}>
        <InputLabel id={value}>{label}</InputLabel>
        <Select
          labelId={name}
          id={name}
          name={name}
          value={value}
          onClick={(event) => handleChangeDropdown(event)}
        >
          {pageLayouts !== undefined && pageLayouts.map((pl) => {
            return (
              <MenuItem key={Math.round(Math.random() * 1000)} value={pl.id}>
                {pl.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div >
  );
}
