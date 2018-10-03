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
                this.setState(() => {
                    return {timeRemaining: this.getTimeRemaining(this.birthday)}
                })
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
        let yearsOld = Math.floor(Number(daysOld / 365));
        return yearsOld;
    }

    renderDate = (birthday) => {
        let bday = new Date(birthday);
        return <div>{ bday.getMonth() + 1 }/{ bday.getDate() }</div>
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
                        <div className='countdown'>
                            <div className='message-container'>
                                <p className='message-container__title'>Countdown Complete</p>
                                <p className='message-container__message'>HAPPY BIRTHDAY!</p>
                            </div>
                        </div> :
                        <div>
                            <div className='large-date'>
                                { this.renderDate(this.birthday) }
                            </div>
                            <div className='countdown'>
                                <ul className='countdown__clock'>
                                    <li>DAYS<p>{ data.days }</p></li>
                                    <li>HOURS<p>{ data.hours }</p></li>
                                    <li>MINUTES<p>{ data.minutes }</p></li>
                                    <li>SECONDS<p>{ data.seconds }</p></li>
                                </ul>
                            </div>
                            <div className='until-container'>
                                { this.renderMessage() }
                            </div>
                        </div>
                }
            </div>
        ); 
    }
}

export default Clock;