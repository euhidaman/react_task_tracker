import Task from './Task'

const Tasks = (props) => {

    return (
        <>
          {props.tasks.map( 
              (task) => (
              <Task key={task.id} task={ task } onDelete={props.onDelete} onToggle={props.onToggle} />
              // Without a unique key, it will throw a warning
              // here, task={ task }, means passing the individual array elements 
              // consisting of 'id,text,day,reminder' as a prop to Task.js
            )
            )}  
        </>
    )
}

export default Tasks
