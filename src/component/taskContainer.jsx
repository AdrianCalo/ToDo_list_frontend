import React from "react";
import './taskContainer.css';

function TaskContainer({title, children}){
    return(
        <div className="task-container">
            <h2>{title}</h2>
            {children}
        </div>
    );
}

export default TaskContainer;