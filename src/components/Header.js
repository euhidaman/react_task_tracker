import PropTypes from 'prop-types'
import Button from "./Button";

const Header = (props) => {

    return (
        <header className='header'>
            <h1> {props.title} </h1>
            <Button color={props.showAdd ? 'red' : 'green'} text={props.showAdd ? 'Close' : 'Add'} onClick={props.onAdd}/>
            {/* If the 'props.showAdd' is 'true', then the color should be red and text displayed on button should be 'Close' */}
        </header>
    )
}

Header.defaultProps = {
    title : "Task Tracker",
}

Header.propTypes = {
    title : PropTypes.string.isRequired,
}

// -- To use this style in elements,
// Example--> <h1 style={headingStyle}>Wassup!!</h1> 

// const headingStyle = {
//     color: "red", 
//     backgroundColor: "black"
// }

export default Header
