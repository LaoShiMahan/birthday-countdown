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
        // this.setState((prevState, props) => {
        //     return ({ formCompleted: !prevState.formCompleted });
        // });
    }

    handleChange = (date) => {
        this.setState(() => {
            return ({ startDate: date });
        });
    }

    handleGenerate = (event) => {
        this.setState(() => {
            return ({ formCompleted: true });
        });
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={ this.handleGenerate } className='birthday-container'>
                {
                    this.state.formCompleted ?
                        <div className='clock-container'>
                            <Clock birthdayFormState={this.state} />
                            <a className='change-date' onClick={this.handleChangeDate}>Change Date</a>
                        </div> :
                        <div className='date-picker-container'>
                            <Datepicker className='date-picker'
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                            />
                            <div className='submit-container'>
                                <input type='submit' value='Generate Countdown'/>
                            </div>
                        </div>
                }
            </form>
        );
    }
}

export default BirthdayForm;