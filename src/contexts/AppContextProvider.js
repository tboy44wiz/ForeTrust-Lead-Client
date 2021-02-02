import React, {createContext} from 'react';
import { withRouter } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

import {leadValidation, staffLogin} from "../utils/Yup_Validator";
import {
    createLeads_url,
    deleteSingleLead_url,
    getAllLeads_url,
    staff_login_url,
    updateSingleLead_url
} from "../routes/API_Routes";

//  Import React Toastify CSS.
import 'react-toastify/dist/ReactToastify.css';

export const AppStoreContext = createContext(undefined);


//  Call th Toast Configuration method.
toast.configure();

class AppContextProvider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            staff: {},
            lead: {
                leads_name: "",
                leads_email: "",
                leads_phone: "",
                leads_state: "",
                leads_address: "",
                purpose: ""
            },
            leads: [],

            email: '',
            password: '',

            infoMessage: "",
            showPassword: false,
            isLoading: false,
            isAuthenticated: false,
        };
        this.modalRef = React.createRef();
    }

    //  React Toast  Custom Methods.
    successToast = (message) => {
        return toast.success(message);
    };
    warningToast = (message) => {
        return toast.warning(message, {autoClose: 2000});
    }
    errorToast = (message) => {
        return toast.error(message);
    };

    //  Input Change Handler.
    handleInputChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
            infoMessage: "",
        });
    };

    //  Lead Input Change Handler.
    handleLeadInputChange = (event) => {
        this.setState({
            lead: {
                ...this.state.lead,
                [event.target.name]: event.target.value,
            },
        });
    };

    // Clear the Form.
    clearFormInputFields = () => {
        this.setState({
            ...this.state,
            lead: {
                leads_name: "",
                leads_email: "",
                leads_phone: "",
                leads_state: "",
                leads_address: "",
                purpose: ""
            },
            isEditMood: false,
        });
    };

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

                const successMessage = response.data.message;
                this.successToast(successMessage);

                //  Update the date with the necessary data.
                this.setState({
                    ...this.state,
                    staff:staff,
                    isLoading: false,
                    isAuthenticated: true,
                });

                //  Navigate to the Staff DashBoard.
                return this.props.history.replace('/staff_dashboard');
            }

            //  Update the State.
            this.setState({
                ...this.state,
                infoMessage: "Something went wrong. Please try again.",
                isLoading: false,
                isAuthenticated: false,
            });
        }
        catch (error) {
            const errorMessage = error.response.data.message;
            this.errorToast(errorMessage);
            this.setState({
                ...this.state,
                isLoading: false,
            });
        }
    };

    //  Create Single Lead.
    createLead = async (event) => {
        event.preventDefault();

        //  Clear the state infoMessage and set showPassword to "false".
        this.setState({
            ...this.state,
            infoMessage: "",
            isLoading: true,
        });

        //  Destructure the required form data from the state.
        const { leads_name, leads_email, leads_phone, leads_state, leads_address, purpose } = this.state.lead;

        //  Validate the form data which is the "reqBody" using yup and then call the API.
        try {
            const leadData = await leadValidation.validate({
                leads_name,
                leads_email,
                leads_phone,
                leads_state,
                leads_address,
                purpose,
            });

            //  Get the Token.
            const staffLoginData = await localStorage.getItem('staffData');

            let token;
            if (staffLoginData !== null) {
                token = JSON.parse(staffLoginData).token;
            }

            //  Make POST Call to the EndPoint
            const response = await axios({
                method: "post",
                url: createLeads_url,
                data: leadData,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
            });

            if (response.data.success) {

                // Save to State.
                this.setState({
                    ...this.state,
                    isLoading: false,
                });

                //  Recall "handleFetchLeads()" function.
                return await this.handleFetchLeads();
            }
            // Reset State.
            return this.setState({
                ...this.state,
                isLoading: false,
            });
        }
        catch (error) {
            const errorMessage = error.response.data.message;
            this.errorToast(errorMessage);
            this.setState({
                ...this.state,
                isLoading: false,
                isCreateLeadSuccessful: false,
            });
        }
    };

    //  Fetch All Leads.
    handleFetchLeads = async () => {
        this.setState({
            isLoading: true,
        });

        try {
            //  Get the Token.
            const staffLoginData = await localStorage.getItem('staffData');

            let token;
            if (staffLoginData !== null) {
                token = JSON.parse(staffLoginData).token;
            }

            //  Make POST Call to the EndPoint
            const response = await axios({
                method: "get",
                url: getAllLeads_url,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
            });

            if (response.data.success) {
                const leads = response.data.data.leads;

                // Save to State.
                return this.setState({
                    ...this.state,
                    leads: leads,
                    isLoading: false,
                });
            }
            // Reset State.
            return this.setState({
                ...this.state,
                isLoading: false,
            });
        }
        catch (error) {
            const status = error.response.status;
            const errorMessage = error.response.data.message;
            console.log(error.response.data);

            if (status === 404) {
                const leads = error.response.data.data.leads;

                this.warningToast(errorMessage);

                //  Update State.
                this.setState({
                    ...this.state,
                    leads: leads,
                    isLoading: false,
                });
            }
            else {
                this.errorToast(errorMessage);

                //  Update State.
                this.setState({
                    ...this.state,
                    isLoading: false,
                });
            }
        }
    };

    //  Create Single Lead.
    updateLead = async (event, leadId) => {
        event.preventDefault();

        //  Clear the state infoMessage and set showPassword to "false".
        this.setState({
            ...this.state,
            infoMessage: "",
            isLoading: true,
        });

        //  Destructure the required form data from the state.
        const { leads_name, leads_email, leads_phone, leads_state, leads_address, purpose } = this.state.lead;

        //  Validate the form data which is the "reqBody" using yup and then call the API.
        try {
            const leadData = await leadValidation.validate({
                leads_name,
                leads_email,
                leads_phone,
                leads_state,
                leads_address,
                purpose,
            });

            //  Get the Token.
            const staffLoginData = await localStorage.getItem('staffData');

            let token;
            if (staffLoginData !== null) {
                token = JSON.parse(staffLoginData).token;
            }


            //  Make POST Call to the EndPoint
            const response = await axios({
                method: "put",
                url: `${updateSingleLead_url}/${leadId}`,
                data: leadData,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
            });

            if (response.data.success) {
                const successMessage = response.data.message;
                const leads = response.data.data.leads;
                this.successToast(successMessage);

                // Save to State.
                this.setState({
                    ...this.state,
                    isLoading: false,
                    leads: leads,
                });

                //  Call the "handleFetchLeads()" method again.
                // return await this.handleFetchLeads();
            }
            // Reset State.
            return this.setState({
                ...this.state,
                isLoading: false,
            });
        }
        catch (error) {
            const errorMessage = error.response.data.message;
            this.errorToast(errorMessage);
            this.setState({
                ...this.state,
                isLoading: false,
                isCreateLeadSuccessful: false,
            });
        }
    };

    //  Delete Single Lead.
    deleteLead = async (leadId) => {

        //  Clear the state infoMessage and set showPassword to "false".
        this.setState({
            ...this.state,
            infoMessage: "",
            isLoading: true,
        });

        try {
            //  Get the Token.
            const staffLoginData = await localStorage.getItem('staffData');

            let token;
            if (staffLoginData !== null) {
                token = JSON.parse(staffLoginData).token;
            }

            //  Make a DELETE call to the API.
            const response = await axios({
                method: 'delete',
                url: `${deleteSingleLead_url}/${leadId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
            });

            if (response.data.success) {
                const successMessage = response.data.message;
                const leads = response.data.data.leads;
                this.successToast(successMessage);

                // Save to State.
                return this.setState({
                    ...this.state,
                    leads: leads,
                    isLoading: false,
                });

                //  Call the "handleFetchLeads()" method again.
                // return await this.handleFetchLeads();
            }
            // Reset State.
            return this.setState({
                ...this.state,
                isLoading: false,
            });
        }
        catch (error) {
            const status = error.response.status;
            const errorMessage = error.response.data.message;
            const leads = error.response.data.data.leads;

            if (status === 404) {
                this.warningToast(errorMessage);
            }
            else {
                this.errorToast(errorMessage);
            }

            //  Update State.
            this.setState({
                ...this.state,
                leads: leads,
                isLoading: false,
            });
        }
    };

    //  Extract a Single Lead from the Leads Array.
    extractSingleLead = (leadId) => {
        //  Extract a Single Lead item based on the one that was selected.
        const selectedLead = this.state.leads.filter((eachLead) => {
            return eachLead.id === leadId;
        })[0];

        //  Update the State with the single Lead item.
        this.setState({
            ...this.state,
            isEditMood: true,
            lead: selectedLead,
        });
    };

    render() {
        return (
            <AppStoreContext.Provider ref={this.modalRef} value={{
                ...this.state,
                handleInputChange: this.handleInputChange,
                handleLeadInputChange: this.handleLeadInputChange,
                handleShowPassword: this.handleShowPassword,
                handleLoginUser: this.handleLoginUser,
                createLead: this.createLead,
                handleFetchLeads: this.handleFetchLeads,
                updateLead: this.updateLead,
                deleteLead: this.deleteLead,
                extractSingleLead: this.extractSingleLead,
                clearFormInputFields: this.clearFormInputFields,
            }}>
                { this.props.children }
            </AppStoreContext.Provider>
        );
    }
}

export default withRouter(AppContextProvider);
