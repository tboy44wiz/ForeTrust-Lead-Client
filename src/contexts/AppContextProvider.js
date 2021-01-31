import React, {createContext} from 'react';
import { withRouter } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

import { staffLogin } from "../utils/Yup_Validator";
import { staff_login_url } from "../routes/API_Routes";

export const AppStoreContext = createContext(undefined);

//  Call th Toast Configuration method.
toast.configure();

class AppContextProvider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            staff: {},
            email: '',
            password: '',
            infoMessage: "",
            showPassword: false,
            isLoading: false,
            isAuthenticated: false,
        }
    }

    //  React Toast  Custom Methods.
    successToast = (message) => {
        return toast.success(message);
    }
    warningToast = (message) => {
        return toast.warn(message,);
    }
    errorToast = (message) => {
        return toast.error(message);
    }

    //  Input Change Handler.
    handleInputChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
            infoMessage: "",
        });
    }

    //  Handle Show Password.
    handleShowPassword = () => {
        this.setState({
            ...this.state,
            showPassword: !this.state.showPassword,
        })
    };

    //  Login Users.
    handleLoginUser = async (event) => {
        event.preventDefault();

        //  Clear the state infoMessage and set showPassword to "false".
        this.setState({
            ...this.state,
            infoMessage: "",
            showPassword: false,
            isLoading: true,
        });

        //  Destructure the required form data from the state.
        const { email, password } = this.state;

        //  Validate the form data which is the "reqBody" using yup and then call the API.
        try {
            const userData = await staffLogin.validate({
                staff_email: email,
                staff_password: password,
            });

            //  Make POST Call to the EndPoint
            const response = await axios({
                method: "post",
                url: staff_login_url,
                data: userData,
                headers: { 'Content-Type': 'application/json' },
            });

            const success = response.data.success;
            const data = response.data.data;
            const staff = data.staff;
            if (success) {
                //  Save Staff data to Local Storage.
                localStorage.setItem('staffData', JSON.stringify(staff));

                //  Update the date with the necessary data.
                this.setState({
                    ...this.state,
                    staff:staff,
                    isLoading: false,
                });

                //  Navigate to the Staff DashBoard.
                return this.props.history.replace('/staff_dashboard');
            }

            //  Update the State.
            this.setState({
                ...this.state,
                infoMessage: "",
                isLoading: false,
            });
        }
        catch (error) {
            this.setState({
                ...this.state,
                isLoading: false,
            });
            this.errorToast(error.errors[0]);
        }
    }

    render() {
        return (
            <AppStoreContext.Provider value={{
                ...this.state,
                handleInputChange: this.handleInputChange,
                handleShowPassword: this.handleShowPassword,
                handleLoginUser: this.handleLoginUser,
            }}>
                { this.props.children }
            </AppStoreContext.Provider>
        );
    }
}

export default withRouter(AppContextProvider);
