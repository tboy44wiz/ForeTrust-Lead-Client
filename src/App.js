import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

/*=== Import the App CSS ===*/
import './App.scss';


/*==== Import AppStoreProvider HOC ====*/
import AppContextProvider from "./contexts/AppContextProvider";

/*====================================================================================================
*                               Components Imports.
* ===================================================================================================*/
import LoginComp from "./comonents/auth_components/Login_Comp";
import StaffDashBoardComp from "./comonents/pages_componens/staff/StaffDashBoard_Comp";
import LeadsComp from "./comonents/pages_componens/leads/Leads_Comp";
import LeadDetailsComp from "./comonents/pages_componens/leads/LeadDetails_Comp";
import StaffProfileComp from "./comonents/pages_componens/staff/StaffProfile_Comp";

const App = () => {
    return (
        <div className="App">
            <Router>
                <AppContextProvider>

                    {/*=============================================================*/}
                    {/*======================== Landing Page =======================*/}
                    <Route exact path="/" component={ LoginComp } />

                    {/*=========================== STAFF ===========================*/}
                    <Route exact path="/staff_dashboard" component={ StaffDashBoardComp } />
                    <Route exact path="/staff_profile" component={ StaffProfileComp } />

                    {/*=========================== LEADS ===========================*/}
                    <Route exact path="/leads" component={ LeadsComp } />
                    <Route exact path="/leads_details/:id" component={ LeadDetailsComp } />

                </AppContextProvider>
            </Router>
        </div>
    );
};

export default App;
