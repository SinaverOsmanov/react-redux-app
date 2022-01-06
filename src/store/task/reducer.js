import { TASK_DELETED, TASK_UPDATED } from "./actionTypes";

export function taskReducer(state = [], action) {
  switch (action.type) {
    case TASK_UPDATED: {
      const newArray = [...state];
      const elemIndex = newArray.findIndex((el) => el.id === action.payload.id);
      newArray[elemIndex] = { ...newArray[elemIndex], ...action.payload };
      return newArray;
    }
    case TASK_DELETED: {
      const newArray = [...state];
      return [...newArray.filter((el) => el.id !== action.payload.id)];
    }
    default:
      return [...state];
  }
}
