import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { v4 as uuidv4 } from "uuid";
import { occupations } from "../data/data";
import SelectDays from "./SelectDays";
import { Form } from "../styledComponents/Form";
import { addNewEmployee as addNewEmployeeAction } from "../actions/actions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AddNewEmployee = ({ addNewEmployee }) => {
  const classes = useStyles();

  const [occupation, setOccupation] = useState("");
  const [employeeDay, setEmployeeDay] = useState([]);

  const handleDaysChange = (event) => {
    setEmployeeDay(event.target.value);
  };

  const handleOccupationChange = (e) => {
    setOccupation(e.target.value);
  };

  const handleAddNewEmployeeSubmit = (e) => {
    e.preventDefault();

    const newEmployee = {
      name: e.target.employeeName.value,
      surname: e.target.employeeSurname.value,
      id: uuidv4(),
      occupation,
      availableDays: [...employeeDay],
    };

    addNewEmployee(newEmployee);
    setOccupation("");
    setEmployeeDay([]);
    e.target.reset();
  };

  return (
    <>
      <Form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleAddNewEmployeeSubmit}
      >
        <TextField
          name="employeeName"
          id="standard-basic"
          label="employee name"
          variant="outlined"
        />
        <TextField
          name="employeeSurname"
          id="standard-basic"
          label="employee surname"
          variant="outlined"
        />

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            occupation
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={occupation}
            onChange={handleOccupationChange}
            label="occupation"
          >
            {occupations.map((occupation) => (
              <MenuItem value={occupation}>{occupation}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <SelectDays
          handleDaysChange={handleDaysChange}
          employeeDay={employeeDay}
        />
        <Button type="submit" variant="contained" color="primary">
          add new employee
        </Button>
      </Form>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewEmployee: (employee) => dispatch(addNewEmployeeAction(employee)),
  };
};

export default connect(null, mapDispatchToProps)(AddNewEmployee);
