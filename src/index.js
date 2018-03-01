import React from 'react';
import http from 'axios';
import PropTypes from 'prop-types';

export default class ClubReadyCheckinComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: props.token,
            store: props.store,
        };
    }
    checkin = async event => {
        event.preventDefault();
        let foundUser = {};
        let barcode = event.target['clubready-checkin-barcode'].value;
        event.target['clubready-checkin-barcode'].value = '';
        let validationPassed = this.props.validation ? this.props.validation(barcode) : true;
        if (validationPassed) {
            let findUserResponse = await http.get(
                `https://www.clubready.com:80/api/current/users/find?ApiKey=${this.state.token}&&&StoreId=${this.state
                    .store}&&Barcode=${barcode}&&&`,
            );
            let found = false;
            findUserResponse.data.users.forEach(user => {
                if (user.Barcode === barcode) {
                    found = true;
                    foundUser = user;
                }
            });
            console.log(findUserResponse);
            if (!found) {
                console.log('Using Phone');
                findUserResponse = await http.get(
                    `https://www.clubready.com:80/api/current/users/find?ApiKey=${this.state.token}&&&StoreId=${this
                        .state.store}&&Phone=${barcode}&&&`,
                );
                console.log(findUserResponse);
                findUserResponse.data.users.forEach(user => {
                    if (user.Phone === barcode) {
                        found = true;
                        foundUser = user;
                    }
                });
            }

            if (found) {
                let userResponse = await http.get(
                    `https://www.clubready.com:80/api/current/users/{UserId}?ApiKey=${this.state
                        .token}&UserId=${foundUser.UserId}&StoreId=${this.state.store}&&FullDetail=true`,
                );
                foundUser = userResponse.data;
                let checkinResponse = await http.post(
                    `https://www.clubready.com:80/api/current/users/checkin?ApiKey=${this.state
                        .token}&Barcode=${userResponse.data.Barcode}&StoreId=${this.state.store}&`,
                );
                this.props.returnHandler({ userData: foundUser, checkin: checkinResponse.data, validation: true });
            } else {
                this.props.returnHandler({ userData: 'No User Found', checkin: false, validation: true });
            }
        } else {
            this.props.returnHandler({ userData: 'Validation Failed', checkin: false, validation: false });
        }
    };
    render() {
        return (
            <form onSubmit={this.checkin}>
                <input
                    style={Object.assign({}, this.props.inputStyle)}
                    name="clubready-checkin-barcode"
                    type="number"
                />
                {this.props.useButton
                    ? <button type="submit" style={this.props.buttonStyle}>
                          {this.props.buttonText}
                      </button>
                    : ''}
            </form>
        );
    }
}
ClubReadyCheckinComponent.propTypes = {
    token: PropTypes.string.isRequired,
    returnHandler: PropTypes.func.isRequired,
    store: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    validation: PropTypes.func,
    inputStyle: PropTypes.object,
    useButton: PropTypes.bool,
    buttonStyle: PropTypes.object,
};
