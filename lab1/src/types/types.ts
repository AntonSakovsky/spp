export type TodoItem = {
    id: number;
    text: string;
    status: boolean;
    end: string;
    file?: TodoFile;
};

export type TodoFile = {
    name: string;
    src: string;
};

export type TodoFilter = "all" | "done";
