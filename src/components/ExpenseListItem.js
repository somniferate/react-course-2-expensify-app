import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral"


export const ExpenseListItem = ( { description, amount, createdAt, id } ) => (
    <div>
    <Link to={`/edit/${id}`}><h2>{description}</h2></Link>
        <p>
            {numeral(amount/100).format("$0,0.00")}
            - 
            {moment(createdAt).format("Do MMM, YYYY")}
        </p>
    </div>
);

export default ExpenseListItem