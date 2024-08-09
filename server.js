import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import bodyParser from "body-parser";
import routeuser from "./src/routers/index.js";

dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Working" });
});

app.use("/", routeuser);

app.all("*", (req, res) => {
  res.status(404).json({
    msg: "Something was wrong, please check the code",
    reqMethod: req.method,
    reqPath: req.path,
    reqQuery: req.query,
    reqBody: req.body,
  });
});

const handleError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).r.json({
    msg: "Internal server error",
  });
};
app.use(handleError);

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
