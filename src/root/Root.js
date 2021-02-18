import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Template from "../Template/Template";
import Home from "../pages/Home";
import NewEmployeePage from "../pages/NewEmployeePage";
import HiredEmployeesPage from "../pages/HiredEmployeesPage";
import DisplayShiftPage from "../pages/DisplayShiftPage";

const Root = () => {
  return (
    <BrowserRouter>
      <Template>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/NewEmployeePage" component={NewEmployeePage} />
          <Route path="/HiredEmployeesPage" component={HiredEmployeesPage} />
          <Route path="/DisplayShiftPage" component={DisplayShiftPage} />
        </Switch>
      </Template>
    </BrowserRouter>
  );
};

export default Root;
