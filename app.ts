require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const connectDb = require("./db/connect");

const authRouter = require("./routes/auth");

app.use(express.json());

app.use("/api/v1/auth", authRouter);

(async () => {
  try {
    const port = 3000;
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Listening to port ${port}...`));
  } catch (e) {
    console.log(e);
  }
})();
