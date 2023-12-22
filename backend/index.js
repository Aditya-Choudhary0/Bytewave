const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./db");
const app = express();




const PORT=3000



app.get("/", (req, res) => {
  res.send("<h1>Start Interview</h1>");
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("DB is connected now");
    console.log(`server is running port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});