import React, { Component } from 'react';

class Clock extends Component {
    constructor(props) {
        super(props)

        this.timer = 0;
        this.birthday = props.birthdayFormState.startDate.toString();
        this.noBirthYear = new Date(this.birthday).getFullYear() == new Date().getFullYear();
        this.state = {
            timeRemaining: this.getTimeRemaining(this.props.birthdayFormState.startDate.toString())
        }
    }

    componentDidMount = () => {
        if (this.timer === 0) {
            this.timer = setInterval(() => {
                const timeRemaining = this.getTimeRemaining(this.birthday)
                this.setState({ timeRemaining: timeRemaining })
            }, 1000);
        }
    }

    componentWillReceiveProps = (nextProps) => {
        console.log(JSON.stringify(nextProps));
    }

    componentWillUnmount = () => {
        clearInterval(this.timer);
    }

    getTimeRemaining = (birthday) => {
        let bday = new Date(birthday);
        let today = new Date();
        let birthMonth = bday.getMonth();
        let currentMonth = today.getMonth();

        if (birthMonth > currentMonth) {
            bday.setFullYear(today.getFullYear());
        } else if (birthMonth < currentMonth) {
            bday.setFullYear(today.getFullYear() + 1);
        } else if (birthMonth === currentMonth) {
            let birthDay = bday.getDate();
            let currentDay = today.getDate();
            if (birthDay > currentDay) {
                bday.setFullYear(today.getFullYear());
            } else if (birthDay < currentDay) {
                bday.setFullYear(today.getFullYear() + 1);
            } else if (birthDay === currentDay) {
                return 0;
            }
        }

        let distance = bday.getTime() - today.getTime();

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

    getAge = (birthday) => {
        let bday = new Date(birthday);
        let today = new Date();
        let distance = today.getTime() - bday.getTime();
        let daysOld = Math.floor(distance / (1000 * 60 * 60 * 24));
        let yearsOld = Number(daysOld / 365).toFixed(0);
        return yearsOld;
    }

    renderMessage = () => {
        if (this.noBirthYear) {
            return (
                <h4>until your birthday!</h4>
            )
        } else {
            return (
                <h4>remaining until you are {this.getAge(this.birthday)}</h4>
            )
        }
    }

    render = () => {
        const data = this.state.timeRemaining;
        return (
            <div>
                {
                    this.state.timeRemaining === 0 ?
                        <div>
                            <h1>Happy Birthday!</h1>
                        </div> :
                        <div>
                            <div>
                                <div>DAYS { data.days }</div>
                                <div>HOURS { data.hours }</div>
                                <div>MINUTES { data.minutes }</div>
                                <div>SECONDS { data.seconds }</div>
                            </div>
                            <div>
                                { this.renderMessage() }
                            </div>
                        </div>
                }
            </div>
        ); 
    }
}

export default Clock;