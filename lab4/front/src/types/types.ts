import { TodoItem } from "./models/todo";

export type StatusType = "todo" | "in progress" | "done";

export type Boards = Record<StatusType, TodoItem[]>;

export type DateFilter = "ASC" | "DESC" | "NONE";

export type BoardsFilter = Record<StatusType, DateFilter>

export type FileDto = {
    filename: string,
    bytes: ArrayBuffer,

}