import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { removeEmployeeFromShift as removeEmployeeFromShiftAction } from "../actions/actions";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    maxWidth: 500,
    margin: "auto",
  },
  table: {
    maxWidth: 500,
  },
  head: {
    color: "white",
    backgroundColor: "black",
  },
  button: {
    backgroundColor: "black",
    margin: "auto",
    fontSize: "12px",
    margin: "10px 0 10px 30px",
    textTransform: "lowercase",
  },
}));

const DisplayShift = ({
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
  removeEmployeeFromShift,
}) => {
  const classes = useStyles();
  const displayDay = (day, morningOrEvening) => {
    return (
      <div className={classes.container}>
        {morningOrEvening === "morningShift" ? (
          <h2>Morning shift: </h2>
        ) : (
          <h2>Evening shift: </h2>
        )}
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.head}>name</TableCell>
                <TableCell className={classes.head} align="right">
                  surname
                </TableCell>
                <TableCell className={classes.head} align="right">
                  occupation
                </TableCell>
                <TableCell className={classes.head} align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {day[morningOrEvening].map((employee) => {
                const { id, name, surname, occupation } = employee;
                return (
                  <TableRow key={id}>
                    <TableCell component="th" scope="row">
                      {name}
                    </TableCell>
                    <TableCell align="right">{surname}</TableCell>
                    <TableCell align="right">{occupation}</TableCell>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        removeEmployeeFromShift(id, morningOrEvening)
                      }
                    >
                      remove
                    </Button>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar
        style={{ backgroundColor: "yellow", color: "black" }}
        position="static"
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Monday" {...a11yProps(0)} />
          <Tab label="Tuesday" {...a11yProps(1)} />
          <Tab label="Wednesday" {...a11yProps(2)} />
          <Tab label="Thursday" {...a11yProps(3)} />
          <Tab label="Friday" {...a11yProps(4)} />
          <Tab label="Saturday" {...a11yProps(5)} />
          <Tab label="Sunday" {...a11yProps(6)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {displayDay(monday, "morningShift")}
        {displayDay(monday, "eveningShift")}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {displayDay(tuesday, "morningShift")}
        {displayDay(tuesday, "eveningShift")}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {displayDay(wednesday, "morningShift")}
        {displayDay(wednesday, "eveningShift")}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {displayDay(thursday, "morningShift")}
        {displayDay(thursday, "eveningShift")}
      </TabPanel>
      <TabPanel value={value} index={4}>
        {displayDay(friday, "morningShift")}
        {displayDay(friday, "eveningShift")}
      </TabPanel>
      <TabPanel value={value} index={5}>
        {displayDay(saturday, "morningShift")}
        {displayDay(saturday, "eveningShift")}
      </TabPanel>
      <TabPanel value={value} index={6}>
        {displayDay(sunday, "morningShift")}
        {displayDay(sunday, "eveningShift")}
      </TabPanel>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    monday: state.monday,
    tuesday: state.tuesday,
    wednesday: state.wednesday,
    thursday: state.thursday,
    friday: state.friday,
    saturday: state.saturday,
    sunday: state.sunday,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeEmployeeFromShift: (employeeId, morningOrEvening) =>
      dispatch(removeEmployeeFromShiftAction(employeeId, morningOrEvening)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayShift);
