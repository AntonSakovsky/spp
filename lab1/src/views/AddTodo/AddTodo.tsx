import React from "react";

export const AddTodo = () => {
    return (
        <form className="addTodo-form" method="POST" action="todo">
            <h2 className="addTodo-title">Add Todo form</h2>
            <div className="addTodo-inputs">
                <input
                    type="text"
                    name="text"
                    className="addTodo-text"
                    placeholder="Task..."
                    autoComplete="off"
                    required
                />
                <div className="end-date-wrap">
                    <label htmlFor="end-date">End date</label>
                    <input type="date" name="end" id="end-date" className="addTodo-end" required />
                </div>
                <button type="submit" className="addTodo-button main-btn">
                    Add
                </button>
            </div>
        </form>
    );
};
