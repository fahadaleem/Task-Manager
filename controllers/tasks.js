const getAllTasks = (req, res) => {
  res.send("all tasks");
};

const getTask = (req, res) => {
  res.send("one task");
};

const deleteTask = (req, res) => {
  res.send("task deleted");
};

const updateTask = (req, res) => {
  res.send("task updated");
};

const createTask = (req, res) => {
  res.send("task created");
};

module.exports = {
  getAllTasks,
  getTask,
  deleteTask,
  updateTask,
  createTask,
};
