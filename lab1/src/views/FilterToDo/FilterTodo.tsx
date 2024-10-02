import React, { FC } from "react";

type FilterTodoProps = {
    filter: "all" | "done";
};

export const FilterTodo: FC<FilterTodoProps> = ({ filter }) => {
    return (
        <div className="filter">
            <form method="POST" action="change-filter" className="filter-form">
                <input type="hidden" name="filter" value={"all"} />
                <input
                    type="submit"
                    value="all"
                    className={`filter-btn ${filter === "all" ? "" : "not-active"}`}
                />
            </form>
            <form method="POST" action="change-filter" className="filter-form">
                <input type="hidden" name="filter" value={"done"} />
                <input
                    type="submit"
                    value="done"
                    className={`filter-btn ${filter === "done" ? "" : "not-active"}`}
                />
            </form>
        </div>
    );
};
