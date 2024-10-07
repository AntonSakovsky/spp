import { useStore } from "@mobx/rootStore-context";
import { Drawer, SelectChangeEvent } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Moment } from "moment";
import { FC } from "react";
import { FaRegSquarePlus } from "react-icons/fa6";
import { GrStatusGood } from "react-icons/gr";
import { IoCalendarOutline } from "react-icons/io5";

import { TodoItem } from "@type/models/todo";
import { StatusType } from "@type/types";
import { DateInput } from "../Inputs/DateInput/DateInput";
import { SelectInput } from "../Inputs/SelectInput/SelectInput";
import { Comments } from "./Comments/Comments";
import { DrawerHeader } from "./DrawerHeader/DrawerHeader";
import { DrawerProperty } from "./DrawerProperty/DrawerProperty";
import { TaskTitle } from "./TaskTitle/TaskTitle";
import style from "./TodoDrawer.module.scss";

type TodoDrawerProps = {
    open: boolean;
    onClose: () => void;
    updatedTodo: TodoItem;
};

export const TodoDrawer: FC<TodoDrawerProps> = observer(({ open, updatedTodo, onClose }) => {
    const { todoStore, userStore } = useStore();

    const onDateChange = async (date: Moment | null) => {
        if (date) {
            try {
                const newUpdatedTodo: TodoItem = { ...updatedTodo, deadline: date.toISOString() };
                todoStore.setUpdatedTodo(newUpdatedTodo);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const onStatusChange = async (e: SelectChangeEvent) => {
        try {
            const newUpdatedTodo: TodoItem = {
                ...updatedTodo,
                status: e.target.value as StatusType,
            };
            todoStore.setPreviuosStatus(updatedTodo.status);
            todoStore.setUpdatedTodo(newUpdatedTodo);
           
        } catch (error) {
            console.log(error);
        }
    };

    const onTaskChange = async (text: string) => {
        try {
            const newUpdatedTodo: TodoItem = { ...updatedTodo, task: text };
            todoStore.setUpdatedTodo(newUpdatedTodo);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Drawer
            open={open}
            onClose={onClose}
            anchor="right"
            sx={{
                "& .MuiDrawer-paper": {
                    width: "35vw",
                    minWidth: 400,
                },
                "& .MuiBackdrop-root": {
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                },
            }}
            className={style.drawer}
        >
            <DrawerHeader
                text="Update task"
                icon={<FaRegSquarePlus className={style.headerIcon} />}
                onClose={onClose}
            />

            <div className={style.body}>
                <TaskTitle text={updatedTodo.task} readonly={false} onChange={onTaskChange} />
                <DrawerProperty
                    propertyIcon={<IoCalendarOutline />}
                    propertyText="Deadline"
                    propertyField={
                        <DateInput date={updatedTodo.deadline} onChange={onDateChange} />
                    }
                />

                <DrawerProperty
                    propertyIcon={<GrStatusGood />}
                    propertyText="Status"
                    propertyField={
                        <SelectInput status={updatedTodo.status} onChange={onStatusChange} />
                    }
                />

                <Comments
                    comments={updatedTodo.comments}
                    username={userStore.user?.username as string}
                />
            </div>
        </Drawer>
    );
});
