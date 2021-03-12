import React, {createContext} from 'react';
import { withRouter } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

import { leadValidation, noteValidation, staffLogin } from "../utils/Yup_Validator";
import {
    createLeads_url, createNote_url, deleteSingleLead_url, deleteSingleNote_url, getAllLeads_url, getSingleLead_url,
    getSingleStaff_url, staff_login_url, updateNote_url, updateSingleLead_url
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
                id: "",
                leads_name: "",
                leads_phone: "",
                leads_email: "",
                leads_address: "",
                leads_state: "",
                leads_source: "",
                purpose: "",
                contact_mode: "",
                status: "In progress",
                note: "",
                staff: [],
                notes: []
            },
            leadDetails: {
                id: "",
                leads_name: "",
                leads_phone: "",
                leads_email: "",
                leads_address: "",
                leads_state: "",
                leads_source: "",
                purpose: "",
                contact_mode: "",
                status: "In progress",
                note: "",
                staff: {},
                notes: []
            },
            leads: [],

            email: '',
            password: '',

            note: "",

            modalType: "createModal",
            showLeadModal: false,
            showCancelModal: false,
            showDeleteModal: false,

            infoMessage: "",
            showPassword: false,
            isLoading: false,
            isAuthenticated: false,
        };
        this.modalRef = React.createRef();
    }

    //  React Toast  Custom Methods.
    successToast = (message) => {
        return toast.success(message, { hideProgressBar: true });
    };
    warningToast = (message) => {
        return toast.warning(message, { hideProgressBar: true });
    }
    errorToast = (message) => {
        return toast.error(message, { hideProgressBar: true });
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
                id: "",
                leads_name: "",
                leads_phone: "",
                leads_email: "",
                leads_address: "",
                leads_state: "",
                leads_source: "",
                purpose: "",
                contact_mode: "",
                status: "In progress",
                note: "",
                staff: [],
                notes: []
            },
        });
    };


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// AUTH & STAFF ////////////////////////////////////////////////////
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


        //  Then call the API.
        try {
            //  Validate the form data which is the "reqBody" using yup.
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
            let errorMessage;
            if (error.errors) {
                errorMessage = error.errors[0]
                this.errorToast(errorMessage);
            }
            else {
                errorMessage = error.response.data.message;
                this.errorToast(errorMessage);
            }
            this.setState({
                ...this.state,
                isLoading: false,
            });
        }
    };

    //  Get Single Staff.
    getSingleStaff = async () => {

        //  Clear the state infoMessage and set showPassword to "false".
        this.setState({
            ...this.state,
            infoMessage: "",
            isLoading: true,
        });


        //  Then call the API.
        try {

            //  Get Staff Data from the Browsers Local Storage.
            let staffLoginData = await localStorage.getItem("staffData");
            let staffId = "";
            if (staffLoginData !== null) {
                const parsedStaffData = JSON.parse(staffLoginData);
                staffId = parsedStaffData.id;
            }

            //  Make POST Call to the EndPoint
            const response = await axios({
                method: "get",
                url: `${getSingleStaff_url}/${staffId}`,
                headers: { 'Content-Type': 'application/json' },
            });

            const success = response.data.success;
            const data = response.data.data;
            if (success) {

                // console.log(this.state.staff);

                //  Update the date with the necessary data.
                return this.setState({
                    ...this.state,
                    staff:data,
                    isLoading: false,
                    isAuthenticated: true,
                });
            }

            //  Update the State.
            return this.setState({
                ...this.state,
                isLoading: false,
            });
        }
        catch (error) {
            let errorMessage;
            if (error.errors) {
                errorMessage = error.errors[0]
                this.errorToast(errorMessage);
            }
            else {
                errorMessage = error.response.data.message;
                this.errorToast(errorMessage);
            }
            this.setState({
                ...this.state,
                isLoading: false,
            });
        }
    };


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////// LEAD /////////////////////////////////////////////////////////
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
        const { leads_name, leads_email, leads_phone, leads_state, leads_address, leads_source, status, purpose } = this.state.lead;

        //  Then call the API.
        try {
            //  Validate the form data which is the "reqBody" using yup.
            const leadData = await leadValidation.validate({
                leads_name,
                leads_email,
                leads_phone,
                leads_state,
                leads_address,
                leads_source,
                status,
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
                await this.handleFetchLeads();

                //  Then call the "handleCloseLeadModal()" function.
                return this.handleCloseLeadModal();
            }
            // Reset State.
            this.setState({
                ...this.state,
                isLoading: false,
            });

        }
        catch (error) {
            let errorMessage;
            if (error.errors) {
                errorMessage = error.errors[0]
                this.errorToast(errorMessage);
            }
            else {
                errorMessage = error.response.data.message;
                this.errorToast(errorMessage);
            }
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

            //  Make GET Call to the EndPoint
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

                //  Sort the Leads in the order of date created using the "createdAt" property.
                leads.sort((leadA, leadB) => new Date(leadA.createdAt) - new Date(leadB.createdAt));

                // console.log(leads);

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

    //  Fetch Single Lead.
    handleFetchSingleLead = async (leadId) => {
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

            //  Make GET Call to the EndPoint
            const response = await axios({
                method: "get",
                url: `${getSingleLead_url}/${leadId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
            });

            if (response.data.success) {
                const lead = response.data.data.lead;

                //  Sort the Leads' Notes in the order of date created using the "createdAt" property.
                lead.notes.sort((noteA, noteB) => new Date(noteA.createdAt) - new Date(noteB.createdAt))

                // console.log(lead);

                // Save to State.
                return this.setState({
                    ...this.state,
                    lead: lead,
                    leadDetails: lead,
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
            const errorMessage = error.response.data.message;

            this.errorToast(errorMessage);

            //  Update State.
            return this.setState({
                ...this.state,
                isLoading: false,
            });
        }
    };

    //  Update Single Lead.
    updateLead = async (event, leadId) => {
        event.preventDefault();

        //  Clear the state infoMessage and set showPassword to "false".
        this.setState({
            ...this.state,
            infoMessage: "",
            isLoading: true,
        });

        //  Destructure the required form data from the state.
        const { leads_name, leads_email, leads_phone, leads_state, leads_address, leads_source, status, purpose } = this.state.lead;

        //  Validate the form data which is the "reqBody" using yup and then call the API.
        try {
            const leadData = await leadValidation.validate({
                leads_name,
                leads_email,
                leads_phone,
                leads_state,
                leads_address,
                leads_source,
                status,
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
                const lead = response.data.data.lead;
                this.successToast(successMessage);

                // Save to State.
                this.setState({
                    ...this.state,
                    isLoading: false,
                    leadDetails: lead,
                });

                //  Then call the "handleCloseLeadModal()" function.
                return this.handleCloseLeadModal();
            }

            // Reset State.
            return this.setState({
                ...this.state,
                isLoading: false,
            });
        }
        catch (error) {
            let errorMessage;
            if (error.errors) {
                errorMessage = error.errors[0]
                this.errorToast(errorMessage);
            }
            else {
                errorMessage = error.response.data.message;
                this.errorToast(errorMessage);
            }
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



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////// NOTE /////////////////////////////////////////////////////////
    //  Create a Note.
    createNote = async (event) => {
        event.preventDefault();

        this.setState({
            ...this.state,
            infoMessage: "",
            isLoading: false,
        });

        //  Destruct the required "note" content from the state.
        const { note } = this.state;

        //  Destruct the required "lead_id" content from the state.
        const { id } = this.state.leadDetails;
        const leads_id = id;

        //  Validate the form data which is the "reqBody" using yup and then call the API.
        try {
            const noteData = await noteValidation.validate({
                leads_id,
                note
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
                url: createNote_url,
                data: noteData,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
            });
            // console.log(response.data.data);

            if (response.data.success) {

                // Save to State.
                this.setState({
                    note: "",
                });

                //  Recall "handleFetchSingleLead()" function.
                return await this.handleFetchSingleLead(leads_id);
            }

            // Reset State.
            return this.setState({
                ...this.state,
                isLoading: false,
            });
        }
        catch (error) {
            let errorMessage;
            if (error.errors) {
                errorMessage = error.errors[0]
                this.errorToast(errorMessage);
            }
            else {
                errorMessage = error.response.data.message;
                this.errorToast(errorMessage);
            }
            this.setState({
                ...this.state,
                isLoading: false,
                isCreateLeadSuccessful: false,
            });
        }

    };

    //  Get Selected Lead.
    getSelectedNote = (noteId) => {
        const { notes } = this.state.leadDetails;
        const note = notes.find((eachNote) => {
            return eachNote.id === noteId;
        });
        this.setState({
            ...this.state,
            note: note.note,
        });
    };

    //  Update Single Lead.
    updateNote = async (event, noteId, staff_id) => {
        event.preventDefault();

        this.setState({
            ...this.state,
            infoMessage: "",
            isLoading: false,
        });

        //  Destruct the required "note" content from the state.
        const { note } = this.state;

        //  Destruct the required "lead_id" content from the state.
        const { id } = this.state.leadDetails;
        const leads_id = id;

        //  Validate the form data which is the "reqBody" using yup and then call the API.
        try {
            const noteData = await noteValidation.validate({
                leads_id,
                note
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
                url: `${updateNote_url}/${noteId}`,
                data: {...noteData, staff_id},
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
            });
            // console.log(response.data.data);

            if (response.data.success) {

                // Call the "clearNoteInputField" function.
                this.clearNoteInputField();

                //  Recall "handleFetchSingleLead()" function.
                return await this.handleFetchSingleLead(leads_id);
            }

            // Reset State.
            return this.setState({
                ...this.state,
                isLoading: false,
                note: "",
            });
        }
        catch (error) {
            let errorMessage;
            if (error.errors) {
                errorMessage = error.errors[0]
                this.errorToast(errorMessage);
            }
            else {
                errorMessage = error.response.data.message;
                this.errorToast(errorMessage);
            }
            this.setState({
                ...this.state,
                isLoading: false,
                isCreateLeadSuccessful: false,
                note: "",
            });
        }
    };

    //  Delete Single Lead.
    deleteNote = async (noteId, staff_id) => {

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

            //  Get the lead ID for this particular Note.
            const leads_id = this.state.leadDetails.id;

            //  Make a DELETE call to the API.
            const response = await axios({
                method: 'delete',
                url: `${deleteSingleNote_url}/${noteId}`,
                data: {leads_id, staff_id},
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
            });

            if (response.data.success) {
                const successMessage = response.data.message;
                this.successToast(successMessage);

                //  Call "handleFetchSingleLead" function again.
                await this.handleFetchSingleLead(leads_id);
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

            //  Update State.
            this.setState({
                ...this.state,
                isLoading: false,
            });
        }
    };

    //  Clear Note Input Field.
    clearNoteInputField = () => {
        this.setState({
            ...this.state,
            note: "",
        });
    };


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////// MODAL ////////////////////////////////////////////////////////
    /**
     * Lead Modal Functions
     * */
    //  When "Add Lead" button is clicked.
    handleShowLeadModal = () => {
        // Clear the Form based on condition.
        (this.state.modalType  === "createModal") && (this.clearFormInputFields());

        this.setState({
            showLeadModal: true,
        });
    };

    //  When "Edit Lead" button is clicked.
    handleCreateSingleLead = () => {
        this.setState({
            ...this.state,
            modalType: "createModal",
        }, () => {

            //  Then open the handleShowLeadModal with Edit features.
            this.handleShowLeadModal();
        });

    };

    //  When "Edit Lead" button is clicked.
    handleEditSingleLead = (event, leadId) => {
        this.setState({
            ...this.state,
            modalType: "editModal",
        }, () => {

            //  Then open the handleShowLeadModal with Edit features.
            this.handleShowLeadModal();
        });
    };

    //  When "Cancel" Modal is shown.
    handleShowCancelModal = () => {
        this.setState((prevState) => ({
            ...prevState,
            showCancelModal: true
        }));
    };

    //  When "Main Modal" is closed.
    handleCloseLeadModal = () => {
        this.handleCloseCancelModal();
        this.setState({
            showLeadModal: false,
        });
    };

    //  When "Confirm Cancel Modal" is closed.
    handleCloseCancelModal = () => {
        // Clear the Form based on condition.
        (this.state.modalType  === "createModal") && (this.clearFormInputFields());

        this.setState({
            showCancelModal: false,
        });
    };


    render() {
        return (
            <AppStoreContext.Provider ref={this.modalRef} value={{
                ...this.state,
                handleShowPassword: this.handleShowPassword,
                handleLoginUser: this.handleLoginUser,
                getSingleStaff: this.getSingleStaff,

                handleInputChange: this.handleInputChange,
                handleLeadInputChange: this.handleLeadInputChange,
                createLead: this.createLead,
                handleFetchLeads: this.handleFetchLeads,
                handleFetchSingleLead: this.handleFetchSingleLead,
                updateLead: this.updateLead,
                deleteLead: this.deleteLead,
                clearFormInputFields: this.clearFormInputFields,

                createNote: this.createNote,
                getSelectedNote: this.getSelectedNote,
                updateNote: this.updateNote,
                deleteNote: this.deleteNote,
                clearNoteInputField: this.clearNoteInputField,

                handleShowLeadModal: this.handleShowLeadModal,
                handleCreateSingleLead: this.handleCreateSingleLead,
                handleEditSingleLead: this.handleEditSingleLead,
                handleShowCancelModal: this.handleShowCancelModal,
                handleCloseLeadModal: this.handleCloseLeadModal,
                handleCloseCancelModal: this.handleCloseCancelModal,
            }}>
                { this.props.children }
            </AppStoreContext.Provider>
        );
    }
}

export default withRouter(AppContextProvider);
