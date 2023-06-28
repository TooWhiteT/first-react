import React, { useState } from "react";

// 一个组件 封装
function Todo(props) {
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState("");

    function handleChange(e) {
        setNewName(e.target.value);
    }

    function changeEditing(flag) {
        if (!flag) {
            setNewName("");
        }
        setEditing(flag);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.editTask(props.id, newName);
        
        changeEditing(false);
    }

    // 编辑模版
    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={props.id}>
                    New name for {props.name}
                </label>
                <input id={props.id} className="todo-text" type="text" value={newName} onChange={handleChange} />
            </div>
            <div className="btn-group">
                <button type="button" className="btn todo-cancel" onClick={() => changeEditing(false)}>
                    取消
                    <span className="visually-hidden">renaming {props.name}</span>
                </button>
                <button type="submit" className="btn btn__primary todo-edit">
                    保存
                    <span className="visually-hidden">new name for {props.name}</span>
                </button>
            </div>
        </form>
    );

    // 显示模板
    const viewTemplate = (
        <div className="stack-small">
            <div className="c-cb">
                <input
                    id={props.id}
                    key={props.id}
                    type="checkbox"
                    defaultChecked={props.isCheck}
                    onChange={() => props.toggleTaskCompleted(props.id)}
                />
                <label className="todo-label" htmlFor={props.id}>
                    {props.name}
                </label>
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn"
                    onClick={() => changeEditing(true)}>
                    修改 <span className="visually-hidden">{props.name}</span>
                </button>
                <button
                    type="button"
                    className="btn btn__danger"
                    onClick={() => props.deleteTask(props.id)}>
                    删除 <span className="visually-hidden">{props.name}</span>
                </button>
            </div>
        </div>
    );

    // 根据状态显示不同view
    return (
        <li className="todo stack-small">
            {isEditing ? editingTemplate : viewTemplate}
        </li>
    );
}

export default Todo;