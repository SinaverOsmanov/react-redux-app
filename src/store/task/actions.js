import { TASK_UPDATED, TASK_DELETED } from "./actionTypes";

export const taskCompletedAction = (taskId, completed) => ({
  type: TASK_UPDATED,
  payload: { id: taskId, completed: !completed },
});

export const changeTitleAction = (taskId) => ({
  type: TASK_UPDATED,
  payload: { id: taskId, title: `new Title for ${taskId}` },
});

export const taskDeletedAction = (taskId) => ({
  type: TASK_DELETED,
  payload: { id: taskId },
});
