import React, { Component } from 'react';
import Datepicker from 'react-datepicker';
import moment from 'moment';

class BirthdayForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            startDate: moment(),
            formCompleted: false
        }
    }

    handleChange = (date) => {
        this.setState({ startDate: date });
    }

    handleGenerate = () => {
        this.setState({ formCompleted: true });
    }

    render() {
        return (
            <div>
               <Datepicker
                    selected={ this.state.startDate }
                    onChange={ this.handleChange }
               />
               <a onClick={ this.handleGenerate }>Generate Countdown</a>
               {
                   this.state.formCompleted ? <h2>Show countdown</h2> : <h2>Don't show countdown</h2>
               }
            </div>
        );
    }
}

export default BirthdayForm;