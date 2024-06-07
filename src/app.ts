import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./routes/v1";
import connect from "./config/db";
dotenv.config();

const app: Express = express();
app.use(express.json());
const port = process.env.PORT || 3000;

connect();

app.use("/api/v1", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
