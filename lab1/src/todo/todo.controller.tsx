import { Request, Response, Router } from "express";
import multer from "multer";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";

import { TodoFilter } from "../types/types.js";
import { App } from "../views/App.js";
import { TodoAddDto } from "./dto/TodoAddDto.js";
import { TodoService } from "./todo.service.js";

export const todoRouter = Router();
const todoService = new TodoService();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

todoRouter.get("/", (req: Request, res: Response) => {
    const todos = todoService.getAllTodos();
    const filter = todoService.getFilter();
    const html = renderToString(<App todos={todos} filter={filter} />);
    res.status(203).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="/styles.css">
            <title>Task Manager</title>
        </head>
        <body>
            <div id="root">${html}</div>
        </body>
        </html>
`);
});

todoRouter.post("/todo", (req: Request, res: Response) => {
    todoService.addToDo(req.body as TodoAddDto);

    res.redirect("/");
});

todoRouter.post("/todo/:id", (req: Request, res: Response) => {
    const todId = Number(req.params.id);
    todoService.changeStatus(todId);

    res.redirect("/");
});

todoRouter.post("/change-filter", (req: Request, res: Response) => {
    const filter = req.body.filter as TodoFilter;
    todoService.changeFilter(filter);

    res.redirect("/");
});

todoRouter.post("/todo/upload/:id", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    const todId = Number(req.params.id);
    todoService.uploadFile(todId, req.file.filename);

    res.redirect("/");
});

todoRouter.get("/uploads/:filename", (req, res) => {
    const filePath = path.join("uploads", req.params.filename);
    res.download(filePath);
});
