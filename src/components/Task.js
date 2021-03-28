import { FaTimes } from 'react-icons/fa'

const Task = (props) => {
    return (
        <div className={`task ${props.task.reminder ? 'reminder':''}`}
            //  the above line means that, 'task' class is always there.
            // but, the class 'reminder' is conditional, and only applicable if props.task.reminder is true    
            onDoubleClick={() => props.onToggle(props.task.id)}>
            <h3> 
                {props.task.text} 
                <FaTimes onClick={() => props.onDelete(props.task.id)} style={{ color:'red', cursor:'pointer' }} />
                {/* the above onClick={() => props.onDelete(props.task.id)} passes the task id in the following way :--
                        (Task.js)onClick={() => props.onDelete(props.task.id)} --> (Tasks.js)props.onDelete --> (App.js)deleteTask
                */}
            </h3>
            <p> {props.task.day} </p>
        </div>
    )
}

export default Task
