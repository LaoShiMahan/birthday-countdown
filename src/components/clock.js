import React, { Component } from 'react';

class Clock extends Component {
    constructor(props) {
        super(props)


        this.state = {
            timeRemaining: this.getTimeRemaining(this.props.birthdayFormState.startDate.toString())
        }
    }

    componentDidMount() {
        this.birthday = this.props.birthdayFormState.startDate.toString();
    }

    getTimeRemaining = (birthday) => {

        let bday = new Date(birthday);
        let today = new Date();

        let distance = bday.getTime() - today.getTime()

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        return {
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    render() {
        const data = this.state.timeRemaining;
        return (
            <div>
                <div>DAYS {data.days}</div>
                <div>HOURS {data.hours}</div>
                <div>MINUTES {data.minutes}</div>
                <div>SECONDS {data.seconds}</div>
            </div>
        ); 
    }
}

export default Clock;