import { useState, useEffect } from "react"
import AddTask from "./components/AddTask";
import Header from './components/Header';
import Tasks from './components/Tasks';

//Toggle reminder on server 1:35:15

function App() {
  //state to show green ADD button, when form is completely filled
  const [showAddTask, setshowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  // Fetch Tasks from JSON backend server at "http://localhost:5000/tasks"
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  const addTask  = async (task) => {

    //-----------Add Task Backend----------------
    const res = await fetch('http://localhost:5000/tasks',{
      method : 'POST',
      headers : {
        'Content-type' : 'application/json',
      },
      body : JSON.stringify(task),
    })

    const data = await res.json()
    setTasks([...tasks, data])

    // --------------------------------Only Front-End Data Adding Part(Temporary)--------------
    // const id = Math.floor(Math.random() * 1000) + 1
    // // The above code creates a random unique id. This is done, bcz this is only a frontend app, 
    // // whereas in a backend the id would've been automatically created.
    // console.log(id);
    
    // const newTask = {id, ...task}
    // // This adds *id* to whtever was passed to task(i.e, *text, day, reminder*)
    // setTasks([...tasks, newTask])
    // // This adds the new task to the previous tasks as an array.
  }

  // Delete Task
  const deleteTask = async (id) => {
    //The below fuction is used to delete the data permanently from the JSON backend
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
      setTasks(tasks.filter( (task) => task.id !== id));
      // this functions filters, and shows every task, 
      // other than the one whose id is passed here.
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {

    const taskToToggle = await fetchTask(id)
    const updaTask = {...taskToToggle, reminder: !taskToToggle.reminder }
    // Updating the reminder off the task, by changing reminder to it's opposite value
    // Basically, we are getting the task, and creating a new task by changing the reminder value
    // and thn storing it in a variable called 'updTask'

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updaTask),
    })
    // This function PUTs the data in the JSON backend
    const data = await res.json()

    setTasks(tasks.map((task) => 
        (task.id === id) ? { ...task, reminder: data.reminder } : task ))
  }

  return (
    <div className="App container">
      <Header onAdd={() => setshowAddTask(!showAddTask)} showAdd={showAddTask} />
      {/* here the onAdd() function is used to toggle the form, from displaying.
      It does tht by setting the state of the showAddTask to the opposite of it's current value*/}
      {showAddTask && <AddTask onAdd={addTask}/>}
      {/* the above line is way of doing ternary without an else statement */}

      { tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> ) : ( 'No Task to Show' ) }
      {/* the above statement is an if-else statement using conditional rendering */}
    </div>
  );
}

export default App;
