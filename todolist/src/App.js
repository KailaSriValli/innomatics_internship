import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState({
    top_priority: [],
    important: [],
    try_to_do_it: [],
    avoid: [],
  });

  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("top_priority");
  const [editingTask, setEditingTask] = useState(null);
  const [editedText, setEditedText] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks({ ...tasks, [category]: [...tasks[category], { text: newTask, completed: false }] });
    setNewTask("");
  };

  const deleteTask = (category, index) => {
    setTasks({
      ...tasks,
      [category]: tasks[category].filter((_, i) => i !== index),
    });
  };

  const toggleComplete = (category, index) => {
    setTasks({
      ...tasks,
      [category]: tasks[category].map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      ),
    });
  };

  const startEditing = (category, index) => {
    setEditingTask({ category, index });
    setEditedText(tasks[category][index].text);
  };

  const saveEdit = () => {
    if (editingTask && editedText.trim() !== "") {
      setTasks({
        ...tasks,
        [editingTask.category]: tasks[editingTask.category].map((task, i) =>
          i === editingTask.index ? { ...task, text: editedText } : task
        ),
      });
    }
    setEditingTask(null);
    setEditedText("");
  };

  return (
    <div className="container">
      <h1>To Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter task..."
        className="input-box"
      />
      <select onChange={(e) => setCategory(e.target.value)} className="dropdown">
        <option value="top_priority">Top Priority</option>
        <option value="important">Important</option>
        <option value="try_to_do_it">Try To Do It</option>
        <option value="avoid">Avoid</option>
      </select>
      <button onClick={addTask} className="add">Add Task</button>

      <div className="grid">
        {Object.keys(tasks).map((cat) => (
          <div key={cat} className="task-category">
            <h2 className="category-title">{cat.replace(/_/g, ' ')}</h2>
            <ul>
              {tasks[cat].map((task, index) => (
                <li key={index} className="task-item">
                  {editingTask && editingTask.category === cat && editingTask.index === index ? (
                    <input
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      onBlur={saveEdit}
                      autoFocus
                      className="edit-input"
                    />
                  ) : (
                    <span
                      className={task.completed ? "completed" : ""}
                      onClick={() => toggleComplete(cat, index)}
                      onDoubleClick={() => startEditing(cat, index)}
                    >
                      {task.text}
                    </span>
                  )}
                  <button className="delete" onClick={() => deleteTask(cat, index)}>❌</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;


