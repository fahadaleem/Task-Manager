require("dotenv").config();
const route = require("./routes/routes");
const express = require("express");

const app = express();

app.use(express.json());

app.use("/api/v1/tasks", route);

app.listen(process.env.PORT, () => {
  console.log("App Started", process.env.PORT);
});
