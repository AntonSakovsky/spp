import { TodoItem } from "./models/todo";

export type StatusType = "TODO" | "IN_PROGRESS" | "DONE";

export type Boards = Record<StatusType, TodoItem[]>;

export type DateFilter = "ASC" | "DESC" | "NONE";

export type BoardsFilter = Record<StatusType, DateFilter>