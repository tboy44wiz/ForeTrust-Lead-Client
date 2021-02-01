import React from 'react';
import { withRouter } from "react-router-dom";
import AppHeaderComp from "./AppHeader_Comp";
import AppFooterComp from "./AppFooter_Comp";

const AppLayoutHOC = (props) => {
    return (
        <div className="AppLayoutComp">
            {/*==== Header ====*/}
            <AppHeaderComp />

            <div className="app-body__wrapper">
                { props.children }
            </div>

            {/*==== Footer ====*/}
            <AppFooterComp />
        </div>
    );
};

export default withRouter(AppLayoutHOC);
