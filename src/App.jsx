import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import InputModal from "./components/InputModal";
import { VAR_NAME } from "./utils/constants";
import TaskItem from "./components/TaskList";

function App() {
  const initialData = {
    name: "",
    desc: "",
    priority: "0",
  };

  const timer = useRef(null);
  // state vars
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem(VAR_NAME)) ?? [],
  );
  const [open, setOpen] = useState(false);
  const [currTask, setCurrTask] = useState(initialData);

  useEffect(() => {
    const debounceSave = () => {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        localStorage.setItem(VAR_NAME, JSON.stringify(tasks));
      }, 100);
    };

    debounceSave();
  }, [tasks]);

  /**
   ** Changes the open state
   ** Resets the current Task on closed state
   */
  const handleOpenAndReset = () => {
    setOpen(!open);
    if (!open) {
      setCurrTask(initialData);
    }
  };

  /**
   * Update task at a specific position
   * @param {object} task task to be updated
   * @param {number} pos position where to update
   */
  const updateTasksAt = (task, pos) => {
    setTasks((t) => [...t.slice(0, pos), task, ...t.slice(pos + 1)]);
  };

  /**
   ** Add new task in the list
   ** Update the exisiting tasks
   * @param {object} task given task object
   */
  const updateTasks = (task) => {
    if (task.id) {
      console.log(task, task.id);
      const taskIndex = tasks.findIndex((t) => t.id == task.id);
      if (taskIndex != -1) {
        updateTasksAt(task, taskIndex);
      }
    } else {
      const currTask = {
        id: Date.now(),
        ...task,
        status: 1,
      };
      setTasks((t) => [...t, currTask]);
    }
  };

  /**
   * Send the clicked taskItem to Input Modal for Editing
   * @param {number} taskId Id of the task
   */
  const editTask = (taskId) => {
    const taskIndex = tasks.findIndex((t) => t.id == taskId);
    if (taskIndex != -1) {
      setCurrTask(tasks[taskIndex]);
      setOpen(true);
    }
  };

  /**
   * Delete the clicked taskItem
   * @param {number} taskId Id of the task
   */
  const deleteTask = (taskId) => {
    const taskIndex = tasks.findIndex((t) => t.id == taskId);
    if (taskIndex != -1) {
      setTasks((t) => [...t.slice(0, taskIndex), ...t.slice(taskIndex + 1)]);
    }
  };

  /**
   * Changes the status of the taskItem
   * @param {number} taskId Id of the task
   * @param {number} changedStatus changed status of the taskItem
   */
  const editTaskStatus = (taskId, changedStatus) => {
    const taskIndex = tasks.findIndex((t) => t.id == taskId);
    if (taskIndex != -1) {
      const task = {
        ...tasks[taskIndex],
        status: changedStatus,
      };
      updateTasksAt(task, taskIndex);
    }
  };

  return (
    <>
      <Header events={{ addTask: handleOpenAndReset }} />

      <InputModal
        open={open}
        task={currTask}
        events={{
          handleDialog: handleOpenAndReset,
          updateTasks: updateTasks,
        }}
      />

      <TaskItem
        tasks={tasks}
        events={{
          handleEdit: editTask,
          handleDelete: deleteTask,
          handleStatus: editTaskStatus,
        }}
      />
    </>
  );
}

export default App;
