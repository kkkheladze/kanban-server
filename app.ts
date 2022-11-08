require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDb = require("./db/connect");

app.use(express.json());
const authRouter = require("./routes/auth");

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

declare namespace Express {
  interface Request {
    user: object;
  }
}
