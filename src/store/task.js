import { createSlice } from "@reduxjs/toolkit";
import todosService from "./../services/todos.service";
import { setError } from "./errors";

const initialState = {
  entities: [],
  isLoading: true,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    received(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    update(state, action) {
      const elemIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      );
      state.entities[elemIndex] = {
        ...state.entities[elemIndex],
        ...action.payload,
      };
    },
    add(state, action) {
      state.entities.push(action.payload);
      state.isLoading = false;
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    taskRequested(state) {
      state.isLoading = true;
    },
    taskRequestFailed(state, action) {
      state.isLoading = false;
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, add, received, taskRequested, taskRequestFailed } =
  actions;

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetch();
    dispatch(received(data));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(taskRequestFailed());
  }
};

export const completeTask = (taskId, completed) => (dispatch, getState) => {
  dispatch(update({ id: taskId, completed: !completed }));
};

export const changeTitleAction = (taskId) =>
  update({ id: taskId, title: `new Title for ${taskId}` });

export const addedTask = (task) => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.addTask(task);
    dispatch(add(data));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(taskRequestFailed());
  }
};

export const taskDeletedAction = (taskId) => remove({ id: taskId });

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;

export default taskReducer;
