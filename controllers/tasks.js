const tasks = require("../db/tasksdb");
const { createError } = require("../middlewares/customErrorHandler");
const { v4 } = require("uuid");

const getAllTasks = (req, res) => {
  return res.send({
    status: "success",
    tasks: tasks,
  });
};

const getTask = (req, res) => {
  const { id } = req.params;
  const task = tasks.find((task) => task.id == id);
  if (!task) {
    return res.status(404).send({
      status: "error",
      message: "Task not found",
    });
  }

  return res.status(201).send({
    status: "status",
    task: task,
  });
};

const deleteTask = (req, res, next) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((task) => task.id == id);

  if (taskIndex === -1)
    return next(
      createError("The task that you are trying to delete is not exist", 404)
    );
  else {
    tasks.splice(taskIndex, 1);
    return res.status(201).send({
      status: "success",
      message: "Task delete successfully!",
    });
  }
};

const updateTask = (req, res, next) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((task) => task.id == id);

  if (!taskIndex) {
    return next(
      createError("The task that you are trying to update is not exist", 404)
    );
  }

  const updatedTask = {
    id: id,
    task: req.body.task || tasks[taskIndex].task,
    completed: req.body.completed || tasks[taskIndex].completed,
    modified_at: new Date().toISOString(),
    created_at: tasks[taskIndex].created_at,
  };
  // update task
  tasks.splice(taskIndex, 1, updatedTask);

  return res.status(201).send({
    status: "success",
    message: "Task updated successfully!",
  });
};

const createTask = (req, res, next) => {
  if (!req.body.task) {
    return next(createError("Please enter a task name", 400));
  }

  const taskCreationDate = new Date().toISOString();
  const taskObj = {
    id: v4(),
    task: req.body.task,
    completed: req.body.completed || false,
    modified_at: taskCreationDate,
    created_at: taskCreationDate,
  };
  tasks.push(taskObj);

  return res.status(201).send({
    status: "success",
    message: "New task created successfully!",
  });
};

module.exports = {
  getAllTasks,
  getTask,
  deleteTask,
  updateTask,
  createTask,
};
