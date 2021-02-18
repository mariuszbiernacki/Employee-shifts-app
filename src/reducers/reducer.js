import { employeesList } from "../data/data";
import { actionsTypes } from "../actions/actionsTypes";

const initialState = {
  employees: [...employeesList],
  monday: {
    morningShift: [],
    eveningShift: [],
  },

  tuesday: {
    morningShift: [],
    eveningShift: [],
  },
  wednesday: {
    morningShift: [],
    eveningShift: [],
  },
  thursday: {
    morningShift: [],
    eveningShift: [],
  },
  friday: {
    morningShift: [],
    eveningShift: [],
  },
  saturday: {
    morningShift: [],
    eveningShift: [],
  },
  sunday: {
    morningShift: [],
    eveningShift: [],
  },
  chosenEmployee: "",
  selectedDay: "",
  availableEmployees: [...employeesList],
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  const { selectedDay } = state;

  switch (type) {
    case actionsTypes.ADD_NEW_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, payload],
      };
    case actionsTypes.SELECT_EMPLOYEE:
      return {
        ...state,
        chosenEmployee: payload,
      };
    case actionsTypes.SELECT_AVAILABLE_EMPLOYEES:
      const chosenEmployees = state.employees.filter((employee) => {
        return employee.availableDays.includes(state.chosenEmployee);
      });

      return {
        ...state,
        availableEmployees: [...chosenEmployees],
      };
    case actionsTypes.SELECT_DAY:
      return {
        ...state,
        selectedDay: payload,
      };
    case actionsTypes.ADD_HIRED_EMPLOYEE_TO_MORNINGSHIFT:
      if (!state[selectedDay].morningShift.includes(payload)) {
        return {
          ...state,
          [selectedDay]: {
            morningShift: [...state[selectedDay].morningShift, payload],
            eveningShift: [...state[selectedDay].eveningShift],
          },
        };
      }
    case actionsTypes.ADD_HIRED_EMPLOYEE_TO_EVENINGSHIFT:
      if (!state[selectedDay].eveningShift.includes(payload)) {
        return {
          ...state,
          [selectedDay]: {
            morningShift: [...state[selectedDay].morningShift],
            eveningShift: [...state[selectedDay].eveningShift, payload],
          },
        };
      }

    case actionsTypes.REMOVE_EMPLOYEE_FROM_SHIFT:
      const shiftAfterDelete = state[selectedDay][
        payload.morningOrEvening
      ].filter((employee) => employee.id !== payload.employeeId);

      return {
        ...state,
        [selectedDay]: {
          ...state[selectedDay],
          [payload.morningOrEvening]: [...shiftAfterDelete],
        },
      };

    default:
      return state;
  }
};

export default reducer;
