import React, { Component } from 'react';
import Datepicker from 'react-datepicker';
import moment from 'moment';

class BirthdayForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            startDate: moment()
        }
    }

    handleChange = (date) => {
        this.setState({ startDate: date });
    }

    render() {
        return (
            <div>
               <Datepicker
                    selected={ this.state.startDate }
                    onChange={ this.handleChange }
               />
            </div>
        );
    }
}

export default BirthdayForm;