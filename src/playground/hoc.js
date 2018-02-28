import React from "react"
import ReactDOM from "react-dom"

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The details are: {props.info}</p>
    </div>
);

const IsAuthenticated = (WrappedComponent) => {
    return (props) => (
        <div>
        <p>{props.isAuthenticated ? "You are logged In" : "Please login to view"}</p>   
        <WrappedComponent {...props}/> 
        </div>
    )};

const IsAuthed = IsAuthenticated(Info);


ReactDOM.render(<IsAuthed info="These are the details" isAuthenticated={false}/>, document.getElementById("app"))