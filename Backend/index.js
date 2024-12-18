const connectToMongo = require("./db");
connectToMongo();
const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
// Allow requests from http://localhost:3000
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://inotebook-managenotes.vercel.app",
      "https://i-notebook-weld.vercel.app",
      "https://i-notebook-inky.vercel.app",
    ],
  })
);
app.use(express.json());
app.use("/api/auth/", require("./routes/auth"));
app.use("/api/notes/", require("./routes/notes"));

app.get("/", (req, res) => {
  console.log("This is reponse");
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
