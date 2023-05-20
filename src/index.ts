require("dotenv").config();
import express from "express";
import loginRouter from "./routes/loginRoutes";
import cookieSession from "cookie-session";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["sdfdfgsfg"] }));
app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/", loginRouter);

const start = () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

start();
