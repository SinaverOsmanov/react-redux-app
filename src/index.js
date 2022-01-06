import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getErrors } from "./store/errors";
import createStore from "./store/store";
import {
  changeTitleAction,
  completeTask,
  getTasksLoadingStatus,
  getTasks,
  loadTasks,
  taskDeletedAction,
  addedTask,
} from "./store/task";

const store = createStore();

const App = () => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getErrors());

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  function changeTitle(taskId) {
    dispatch(changeTitleAction(taskId));
  }

  function deleteTask(taskId) {
    dispatch(taskDeletedAction(taskId));
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>App</h1>
      <button
        onClick={() =>
          dispatch(
            addedTask({
              userId: Date.now(),
              title: "Some text",
              completed: false,
            })
          )
        }
      >
        Add Task
      </button>
      <ul>
        {state.map((s) => (
          <li key={s.id}>
            <p>{s.title}</p>
            <p>{`Completed: ${s.completed}`}</p>
            <button onClick={() => dispatch(completeTask(s.id, s.completed))}>
              Completed task
            </button>
            <button onClick={() => changeTitle(s.id)}>Change title</button>
            <button onClick={() => deleteTask(s.id)}>Delete task</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

// const Shell = () => {
//   return (
//     <ProviderStoreRedux>
//       <App />
//     </ProviderStoreRedux>
//   );
// };

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
