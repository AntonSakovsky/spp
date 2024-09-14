import "dotenv/config";
import express from "express";

import { todoRouter } from "./todo/todo.controller.js";

export const app = express();
app.use(express.json());
app.use(express.static("src/public"));
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

app.use("/", todoRouter);

app.listen(process.env.PORT, () => {
    console.log()
    console.log(`[server] server is running on http://localhost:${process.env.PORT}`);
});
