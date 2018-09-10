import React, { Component } from 'react';
import Datepicker from 'react-datepicker';
import moment from 'moment';
import Clock from './clock';

class BirthdayForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            startDate: moment(),
            formCompleted: false
        }
    }

    handleChangeDate = () => {
        this.setState({ formCompleted: false });
    }

    handleChange = (date) => {
        this.setState({ startDate: date });
    }

    handleGenerate = () => {
        this.setState({ formCompleted: true });
    }

    render() {
        return (
            <div className='birthday-form__wrapper'>
                {
                    this.state.formCompleted ?
                        <div>
                            <Clock birthdayFormState={this.state} />
                            <a onClick={this.handleChangeDate}>Change Date</a>
                        </div> :
                        <div>
                            <Datepicker
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                            />
                            <a onClick={this.handleGenerate}>Generate Countdown</a>
                        </div>
                }
            </div>
        );
    }
}

export default BirthdayForm;