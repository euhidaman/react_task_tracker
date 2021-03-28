import { useState } from "react";

const AddTask = (props) => {

    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        //The preventDefault() method cancels the event if it is cancelable, 
        // meaning that the default action that belongs to the event will not occur.
        // Here, it means --> Clicking on a "Submit" button, will prevent it from submitting a form.
        if (!text) {
            // This condition is activated, when there is no task added to the *Add Task* field
            alert("Please Add Task !!");
            return
        }

        props.onAdd({text, day, reminder})
        //This code passes the given values, to add them to the tasks list

        //The below 3 lines clears all the input fields, and sets them back to the way they were before
        setText('')
        setDay('')
        setReminder(false)
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control' >
                <label>Task</label>
                <input type='text' value={text} 
                onChange={(e) => setText(e.target.value) } 
                placeholder='Add Task' />
            </div>
            <div className='form-control' >
                <label>Day & Time</label>
                <input type='text' value={day}
                 onChange={(e) => setDay(e.target.value)} 
                placeholder='Add day and time' />
            </div>
            <div className='form-control form-control-check' >
                <label>Set Reminder</label>
                <input type='checkbox' checked={reminder} value={reminder}
                // *checked* means, if the checkbox should be ticked or not
                 onChange={(e) => setReminder(e.currentTarget.checked)} />
            </div>
            <input type='submit' value='Save Task' className='btn btn-block'/>
        </form>
    )
}

export default AddTask
