import React from "react";
import './taskCard.css';


function TaskCard({task,onDelete,buttonLabel}){
    return(
        <div className="card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.date}</p>

            <button onClick={onDelete}>{buttonLabel}</button>
        </div>
    );
}

export default TaskCard