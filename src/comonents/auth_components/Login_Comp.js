import React, {useContext, useEffect, useState} from 'react';
import { Redirect } from "react-router-dom";

/*==== Import AppStoreContext HOC ====*/
import { AppStoreContext } from "../../contexts/AppContextProvider";

/*==== Import the LandingPage_Comp CSS ====*/
import '../../scss/_Login_Comp.scss';

/*==== Import React Icons ====*/
import { FiEye, FiEyeOff } from 'react-icons/fi'

/*==== Import Images ====*/
import ForeTrustLogo from '../../assets/images/foretrust_logo.png';
import jwt_decode from "jwt-decode";


const LoginComp = (props) => {

    // Global State
    const { email, password, isLoading, showPassword, handleInputChange, handleShowPassword, handleLoginUser } = useContext(AppStoreContext);

    //  Internal State.
    const [state, setState] = useState({
        isAuthenticated: false
    });

    useEffect( () => {
        checkLoginStatus();
    });


    const checkTokenExpiration = (staffLoginData) => {

        if (staffLoginData !== null) {
            //  Decode the Token.
            const decodedToken = jwt_decode(staffLoginData.token);

            //  Get the current time.
            const currentTime = new Date() / 1000;
            //  Remove decimal points
            const currentTimeString = Math.trunc(currentTime);

            //  Compare the current time with the expiration time in the decoded token.
            return decodedToken.exp > currentTimeString;
        }
        else {
            return false;
        }
    }
    const checkLoginStatus = () => {
        //  Get Staff Data from the Browsers Local Storage.
        let staffLoginData = localStorage.getItem("staffData");

        if (staffLoginData !== null) {
            if (checkTokenExpiration(JSON.parse(staffLoginData))) {
                //  Set to state
                return setState((prevState) => ({
                    ...prevState,
                    isAuthenticated: true,
                }));
            }
        }
    }

    if (state.isAuthenticated) {
        return <Redirect to="/staff_dashboard" />
    }

    return (
        <div className="LandingPageComp">
            <div className="main__wrapper">
                <div className="image_wrapper">
                    <img src={ ForeTrustLogo } className="foreTrust-logo__image" alt="ForeTrust Logo"/>
                </div>

                {/*=== Form ===*/}
                <div className="form_wrapper">
                    <form onSubmit={ event => handleLoginUser(event) } className="mCard login__form">
                        <h1 className="form__heading">LOGIN</h1>

                        <br />

                        <div className="form-group">
                            <label htmlFor="email" className="form__label">Email:</label>
                            <div className="input-box__wrapper">
                                <input type="email" name="email" value={ email }
                                       onChange={ (event => handleInputChange(event)) }
                                       className="form-control form__input"
                                       placeholder="Your email address..."
                                />
                            </div>
                        </div>
                        <div className="form-group ">
                            <label htmlFor="password" className="form__label">Password:</label>
                            <div className="input-box__wrapper">
                                <input type={ (showPassword) ? "text" : "password" } name="password" value={ password }
                                       onChange={ (event => handleInputChange(event)) }
                                       className="form-control form__input"
                                       placeholder="Your password..."
                                />
                                <span
                                    onClick={ handleShowPassword }
                                    className="input--icons--suffix"
                                >
                                    { (showPassword) ? <FiEye/> : <FiEyeOff/> }
                                </span>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-block mCard login__button">
                            {
                                (isLoading) ? ("Please wait...") : ("Login")
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginComp;
