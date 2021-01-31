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
import StaffDashBoardComp from "./comonents/pages_componens/StaffDashBoard_Comp";
import LeadsComp from "./comonents/pages_componens/Leads_Comp";

const App = () => {
    return (
        <div className="App">
            <Router>
                <AppContextProvider>

                    {/*=============================================================*/}
                    {/*======================== Landing Page =======================*/}
                    <Route exact path="/" component={ LoginComp } />

                    {/*=============================================================*/}
                    <Route exact path="/staff_dashboard" component={ StaffDashBoardComp } />
                    <Route exact path="/leads" component={ LeadsComp } />

                </AppContextProvider>
            </Router>
        </div>
    );
};

export default App;
