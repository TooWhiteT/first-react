import logo from './logo.svg';
import './App.css';

import React, { useState } from "react";
import { nanoid } from "nanoid"

// 导入组件
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

function App(props) {

  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.isCheck,
    Completed: (task) => task.isCheck,
  };

  const FILTER_NAMES_MAP = {
    "All":"全部",
    "Active":"正在进行",
    "Completed":"已完成"
  };

  const FILTER_NAMES = Object.keys(FILTER_MAP);

  // React 每个组件props的key是特殊的，key 是一个被 React 管理的特殊的 prop，你不能将其用于其他目的
  // 你应该传递不同的 key 给任何使用迭代方式渲染的东西
  const taskList =
    tasks
    ?.filter(FILTER_MAP[filter])
    ?.map((task) =>
      <Todo
        id={task.id}
        key={task.id}
        name={task.name}
        isCheck={task.isCheck}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    );

  // const filtersList = [
  //   <FilterButton text="全部" isPressed="true" id="fb_all" />,
  //   <FilterButton text="正在进行" isPressed="fakse" id="fb_active" />,
  //   <FilterButton text="已完成" isPressed="false" id="fb_completed" />
  // ]

  const filtersList = FILTER_NAMES.map((name) => (
    <FilterButton
      id={name}
      key={name}
      text={FILTER_NAMES_MAP[name]}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ))


  function toggleTaskCompleted(id) {
    const updatedTasks = tasks?.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, isCheck: !task.isCheck };
      }
      return task;
    });
    setTasks(updatedTasks);
  }


  function deleteTask(id) {
    const remainingTasks = tasks?.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks?.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }


  function addTask(name) {
    const newTask = { id: `todo_${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>任务清单</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filtersList}
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
