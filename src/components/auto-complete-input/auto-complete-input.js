import React, {Component} from 'react';
import {connect} from "react-redux";

import './auto-complete-input.css';
import { withUsersService } from './../hoc';
import {inputValueChanged, usersLoaded, usersShowed} from './../../actions';

class AutoCompleteInput extends Component {
    lettersToHighlight = 0;
    lastActive = -1;

    constructor(props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnOptionChoose = this.handleOnOptionChoose.bind(this);
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
    }

    componentDidMount() {
        const { service, usersLoaded } = this.props;
        service.getUsers()
            .then((data) => usersLoaded(data));
    }

    handleOnChange(e) {
        const { users, usersShowed, inputValueChanged } = this.props;

        this.lastActive = -1;

        let newUsersPresent;

        inputValueChanged(e.target.value);

        if (e.target.value.length === 0) {
            newUsersPresent = [];
            this.lettersToHighlight = 0;
        } else {
            this.lettersToHighlight = e.target.value.length;
            newUsersPresent = users.filter((user) => {
                return user.username.toUpperCase().startsWith(e.target.value.toUpperCase());
            }).map((user) => {
                return {
                    ...user,
                    active: false
                }
            });
        }

        usersShowed(newUsersPresent);
    }

    handleOnOptionChoose(e) {
        const { inputValueChanged, usersShowed } = this.props;
        inputValueChanged(e.target.getAttribute('value'));
        usersShowed([]);
    }

    handleOnKeyDown(e) {
        const { usersPresent, usersShowed, inputValueChanged } = this.props;
        if (e.keyCode === 40 || e.keyCode === 38) {
            if (e.keyCode === 40) {
                if (this.lastActive !== usersPresent.length - 1) {
                    this.lastActive++;
                }
                else {
                    this.lastActive = 0
                }
            }

            if (e.keyCode === 38) {
                if (this.lastActive >= 1) {
                    this.lastActive--;
                }
                else {
                    this.lastActive = usersPresent.length-1
                }
            }

            const newUsersPresent = usersPresent.map((user, index) => {
                return {
                    ...user,
                    active: index === this.lastActive
                }
            });

            usersShowed(newUsersPresent);
        }

        if (e.keyCode === 13) {
            const activeOne = usersPresent.filter((user) => user.active);

            if (activeOne.length !== 0) {
                inputValueChanged(activeOne[0].username);
                usersShowed([]);
            }
        }
    }

    render() {
        const { usersPresent, inputValue } = this.props;
        return (
            <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                <div className="autocomplete" style={{ width: "300px" }}>
                    <input
                        id="myInput"
                        type="text"
                        name="userName"
                        placeholder="Username"
                        onChange={this.handleOnChange}
                        onKeyDown={this.handleOnKeyDown}
                        value={inputValue}
                    />
                    <div className="autocomplete-items">
                        {
                            usersPresent.map((user) => {
                                const username = user.username;
                                return <div
                                    key={user.id}
                                    onClick={this.handleOnOptionChoose}
                                    value={username}
                                    className={`${user.active ? "autocomplete-active" : ''}`}
                                >
                                    <b value={username}>{username.slice(0, this.lettersToHighlight)}</b>
                                    <span value={username}>{username
                                        .slice(this.lettersToHighlight, username.length)}</span>
                                    <input
                                        type='hidden'
                                        value={user.username}
                                    />
                                </div>;
                            })
                        }
                    </div>
                </div>
                <input type="submit" />
            </form>
        );
    }
}

const mapStateToProps = ({ users, usersPresent, inputValue }) => {
    return {
        users,
        usersPresent,
        inputValue
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        usersLoaded: (newUsers) => {
            dispatch(usersLoaded(newUsers));
        },
        usersShowed: (newUsersShowed) => {
            dispatch(usersShowed(newUsersShowed));
        },
        inputValueChanged: (newInputValue) => {
            dispatch(inputValueChanged(newInputValue));
        }
    }
}

export default withUsersService()(connect(mapStateToProps, mapDispatchToProps)(AutoCompleteInput));
