import express, { Request, Response } from "express";
import userRoutes from "./routes/user.route";

const PORT: number = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Start server: http://localhost:${PORT}`);
});
