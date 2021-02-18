import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const NavLink = styled(Link)`
  margin: 0 20px;
  color: #ffffff;
  text-decoration: none;
  text-transform: uppercase;
  font-family: sans-serif;
  font-size: 15px;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar color="secondary" position="static">
        <Container fixed>
          <Toolbar variant="dense">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/NewEmployeePage">Add new employee</NavLink>
            <NavLink to="/HiredEmployeesPage">
              Add hired employee to schedule
            </NavLink>
            <NavLink to="/DisplayShiftPage">Display shift</NavLink>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
