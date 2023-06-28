import React, { useState } from "react";

function Form(props) {

    const [name, setName] = useState("");

    // 处理改变 输入文字
    function handleChange(e) {
        setName(e.target.value);
    }

    // 处理提交
    function handleSubmit(e) {
        e.preventDefault();
        
        // 调用外部传入的addTask方法 把useState中的name当参数出入
        props.addTask(name);

        setName(""); 
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    你需要做什么？
                </label>
            </h2>
            <input
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn__primary btn__lg">
                添加
            </button>
        </form>
    );
}

export default Form;