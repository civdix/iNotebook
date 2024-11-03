const connectToMongo = require("./db");
connectToMongo();
const express = require("express");
const app = express();
const port = 5000;
const cors = require('cors');
app.use(cors({
  origin:"https://i-notebook-weld.vercel.app"),
  methods:["GET","POST","DELETE","PUSH"]}))
app.use(express.json());
app.use("/api/auth/", require("./routes/auth"));
app.use("/api/notes/", require("./routes/notes"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
