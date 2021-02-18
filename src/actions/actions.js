import { actionsTypes } from "./actionsTypes";

export const addNewEmployee = (employee) => {
  return {
    type: actionsTypes.ADD_NEW_EMPLOYEE,
    payload: employee,
  };
};

export const selectEmployee = (employee) => {
  return {
    type: actionsTypes.SELECT_EMPLOYEE,
    payload: employee,
  };
};

export const selectAvailableEmployees = () => {
  return {
    type: actionsTypes.SELECT_AVAILABLE_EMPLOYEES,
  };
};

export const selectDay = (day) => {
  return {
    type: actionsTypes.SELECT_DAY,
    payload: day,
  };
};

export const addHiredEmployeeToMorningShift = (employee) => {
  return {
    type: actionsTypes.ADD_HIRED_EMPLOYEE_TO_MORNINGSHIFT,
    payload: employee,
  };
};

export const addHiredEmployeeToEveningShift = (employee) => {
  return {
    type: actionsTypes.ADD_HIRED_EMPLOYEE_TO_EVENINGSHIFT,
    payload: employee,
  };
};

export const removeEmployeeFromShift = (employeeId, morningOrEvening) => {
  return {
    type: actionsTypes.REMOVE_EMPLOYEE_FROM_SHIFT,
    payload: {
      employeeId,
      morningOrEvening,
    },
  };
};
