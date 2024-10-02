import React from "react";

export const AddTodo = () => {
    return (
        <form className="addTodo-form" method="POST" action="todo">
            <h2 className="addTodo-title">Todo list</h2>
            <div className="addTodo-inputs">
                <div className="end-date-wrap">
                    <input type="date" name="end" id="end-date" className="addTodo-end" required />
                </div>
                <input
                    type="text"
                    name="text"
                    className="addTodo-text"
                    placeholder="Task..."
                    autoComplete="off"
                    required
                />
                <br />
                <button type="submit" className="addTodo-button main-btn">
                    Add
                </button>
            </div>
        </form>
    );
};
