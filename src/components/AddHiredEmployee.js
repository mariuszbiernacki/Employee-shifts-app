import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { days } from "../data/data";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import { Form } from "../styledComponents/Form";
import { connect } from "react-redux";
import {
  selectEmployee as selectEmployeeAction,
  selectAvailableEmployees as selectAvailableEmployeesAction,
  selectDay as selectDayAction,
  addHiredEmployeeToMorningShift as addHiredEmployeeToMorningShiftAction,
  addHiredEmployeeToEveningShift as addHiredEmployeeToEveningShiftAction,
} from "../actions/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const AddHiredEmployee = ({
  availableEmployees,
  selectAvailableEmployees,
  chosenEmployee,
  selectEmployee,
  selectDay,
  addHiredEmployeeToMorningShift,
  addHiredEmployeeToEveningShift,
}) => {
  const classes = useStyles();
  const [shiftTime, setShiftTime] = useState("");

  const handleDayChange = (e) => {
    selectDay(e.target.value);
  };

  const handleEmployeeChange = (e) => {
    selectEmployee(e.target.value);
  };

  const handleShiftTimeChange = (e) => {
    setShiftTime(e.target.value);
  };

  const handleAddHiredEmployeeForm = (e) => {
    e.preventDefault();
    {
      shiftTime === "morningShift"
        ? addHiredEmployeeToMorningShift(chosenEmployee)
        : addHiredEmployeeToEveningShift(chosenEmployee);
    }
    selectAvailableEmployees("");
    e.target.reset();
  };

  return (
    <Form onSubmit={handleAddHiredEmployeeForm}>
      <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">
          shift day
        </InputLabel>
        <Select
          className={classes.select}
          name="shiftDay"
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={chosenEmployee}
          onChange={(e) => {
            handleDayChange(e);
            handleEmployeeChange(e);
            selectAvailableEmployees();
          }}
          label="shiftDay"
        >
          {days.map((day) => (
            <MenuItem value={day}>{day}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="gender"
          name="shiftTime"
          value={shiftTime}
          onChange={handleShiftTimeChange}
        >
          <FormControlLabel
            value="morningShift"
            control={<Radio />}
            label="morning shift"
          />
          <FormControlLabel
            value="eveningShift"
            control={<Radio />}
            label="evening shift"
          />
        </RadioGroup>
      </FormControl>
      {chosenEmployee === "" ? null : (
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            shift day
          </InputLabel>
          <Select
            name="availableEmployees"
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={chosenEmployee}
            onChange={handleEmployeeChange}
            label="available employees"
          >
            {availableEmployees.map((employee) => {
              const { surname, occupation } = employee;
              return (
                <MenuItem
                  value={employee}
                >{`${surname} ${occupation}`}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
      <Button type="submit" variant="contained" color="primary">
        dodaj
      </Button>
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
    chosenEmployee: state.chosenEmployee,
    availableEmployees: state.availableEmployees,
    selectedDay: state.selectedDay,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectEmployee: (employee) => dispatch(selectEmployeeAction(employee)),
    selectAvailableEmployees: (employee) =>
      dispatch(selectAvailableEmployeesAction(employee)),
    selectDay: (day) => dispatch(selectDayAction(day)),
    addHiredEmployeeToMorningShift: (employee) =>
      dispatch(addHiredEmployeeToMorningShiftAction(employee)),
    addHiredEmployeeToEveningShift: (employee) =>
      dispatch(addHiredEmployeeToEveningShiftAction(employee)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddHiredEmployee);
