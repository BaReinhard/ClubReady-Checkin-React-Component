[![Build Status](https://travis-ci.org/BaReinhard/ClubReady-Checkin-React-Component.png?branch=master)](https://travis-ci.org/BaReinhard/ClubReady-Checkin-React-Component)

# ClubReady-Checkin-React-Component
React Input that takes a barcode or phone number to checkin a member, returns the usersdata and whether they were checkedin successfully

# Install 

```
npm install clubready-checkin-react-component@latest
```

# Example Usage

```
import React from 'react';
import ClubReadyCheckin from 'clubready-checkin-react-component';

export default class UsingClubReadyCheckin extends React.Component {
    returnHere = obj => {
        console.log(obj);
        let objArray = [];
        for (let keys in obj.userData) {
            if (!obj.userData.hasOwnProperty(keys)) continue;
            objArray.push({ name: keys, value: obj.userData[keys] });
        }
        this.setState({
            userData: objArray,
        });
    };
    validateHere = (val) => {
        return val.length > 4;
    }
    render() {
        return (
            <div>
                <ClubReadyCheckin
                    token={'use-your-actual-token'}
                    store={123}
                    useButton={true}
                    buttonStyle={{ color: 'red' }}
                    inputStyle={{ color: 'black' }}
                    formStyle={{ backgroundColor: 'white' }}
                    validation={validateHere}
                />
                <div>Data to be Displayed</div>
                {this.state.userData
                    ? this.state.userData.map(item => {
                        return (
                              <span>
                                  {item.name}: {item.value}
                                  <br />
                              </span>
                          );
                    })
                    : ''}
            </div>
        );
    }
}
```

# Example Output

![Gif](https://lh3.googleusercontent.com/z3DaXcGfLvR5CCTgaPjy-XIMO4aCziSLwRMjOe6tNNua1NtEB6VpSbbOxvsjK77iuYihDXkbJdhSwj1Pierop3ENvzAMbyJTePDzZa4cWsaHOwHcK7RTkT2pxcKGKKKfHwt20pPJ5LhbJQMuR38tP-xqs4m621l8QBaJanCBPE0IfwALw1LEtx7Pk3ejPoZIMlhr-IWHBKV7i0k3P545yVI0ZQGji8Sb6FQ9g-3o3vgITRjCxYKOdFMh_rEkZ0zLq4Fg-FfYXBh5Qx6-q9KTDVqHioHzyodSZD1PohEgfIpOG0JqUr9b_UamEAgIk0Vooe5_-vSZ_NAcVhibyahl9PiUESS7IuUo1ssRigA8KjNE5Mzi_csSjT4noRBElR3iTUl64atjTTqIaO21ZgTC2tGrdNMQjlipoxooqpt0j__yRy825t2ITsaF0FTbDAyFRK6UwL3LX5aWtnqJ4nBZrrHpGaco1ISnZDPYIt4wfa9IlhgkokHRopuRiOW_PwDi192--POEvWc7kSMrH6D591gquOV1rsqp6y4E0CgyHAqi1nvSMXw5plNc3lyDH-eCdcMub5gBTNwOC3ost4Jp3utRt7qVHgqK1LEBWRnFw0U2qgzmEaY1=w600-h375-no)

# API

## returnHandler (Required) (Function)
* returnHandler is used to return the results of the checkin process, it returns an `Object` will three properties; `userData`, `validation`, and `checkin`.
* `checkin` will always return a value of true or false, depending if the member was successfully checkedin.
* `validation` will always return a value of true or false. If you did not pass a validation function in validation will always be true. If you did pass a validation function, it will test the value based on whatever you have chosen to validate it against and validation will return as whatever value you returned from your validation function.
* `userData` will return a full data dump from the found user from the `/users/{UserId}` ClubReady Api Endpoint with fulldetail set to true

## token (Required) (String)
* token is the Access Token given to you by a staff member of ClubReady, you must request one.

## store (Required) (String or Number)
* store is the Store ID of the Site you are trying to check-in for.

## validation (Function)
* validation is a function that will validate the input value, it should only return a true or false value depending on whether or not the value passes your validation criterion.

## inputStyle (Object)
* inputStyle is any styles you want to use for the input element of the form, given that this input is in the form an enter button will submit the form

## useButton (Boolean)
* useButton is a true or false value, true meaning that a button will be rendered, false no button will be rendered

## buttonStyle (Object)
* buttonStyle is a style Object that will be applied solely to the button element.

## formStyle (Object)
* formStyle is a style Object that will be applied to the containing form element, normal style inheritance applies.





