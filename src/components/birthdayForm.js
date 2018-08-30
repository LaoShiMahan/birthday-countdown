import React, { Component } from 'react';
import Datepicker from 'react-datepicker';

class BirthdayForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
               <Datepicker />
            </div>
        );
    }
}

export default BirthdayForm;