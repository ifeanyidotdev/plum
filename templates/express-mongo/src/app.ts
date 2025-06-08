import express, { Express, Request, Response } from "express";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_: Request, res: Response) => {
  res.send("Plum Mongo Express!");
});

export default app;
