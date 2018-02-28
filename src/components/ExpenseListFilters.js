import React from "react";
import { connect } from "react-redux";
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from "../actions/filters"
import { DateRangePicker } from "react-dates"
import uuid from "uuid"

export class ExpenseListFilters extends React.Component {
    state = {
        focusedInput: null
    }

    onDatesChange = ({ startDate, endDate }) => {
        this.props.setEndDate(endDate);
        this.props.setStartDate(startDate);
    };

    onFocusChange = (focusedInput) => {
        this.setState({ focusedInput })};

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value)
    }

    onFilterChange = (e) => {
        e.target.value === "date" ? 
            this.props.sortByDate() : 
            this.props.sortByAmount()
    }

    render() {
       return( <div>
            <input 
                type="text" 
                value={this.props.filters.text} 
                onChange={(e) => this.onTextChange(e)}/>
            <select 
                value={this.props.filters.sortBy} 
                onChange={(e) => this.onFilterChange(e)}>
                <option value="date">Date</option>
                <option value="amount">Amount</option>
            </select>
            <DateRangePicker 
                startDate={this.props.filters.startDate}
                startDateId={uuid()}
                endDate={this.props.filters.endDate}
                endDateId={uuid()}
                onDatesChange={this.onDatesChange}
                focusedInput={this.state.focusedInput}
                onFocusChange={this.onFocusChange} 
                isOutsideRange={() => false}  
                numberOfMonths={1}
                showClearDates={true}    
            />
      </div>
    )};
};

const mapStateToProps = (state) => ({
    filters: state.filter
});

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (value) => dispatch(setTextFilter(value)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
});

export default connect (mapStateToProps, mapDispatchToProps)(ExpenseListFilters)