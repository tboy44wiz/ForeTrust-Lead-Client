import React from 'react';

/*==== Import ProtectedRouteHoc HOC ====*/
import ProtectedRouteHoc from "../auth_components/ProtectedRoute_HOC";
import AppLayoutHOC from "../layout_components/AppLayout_HOC";

const LeadsComp = () => {
    return (
        <ProtectedRouteHoc>
            <AppLayoutHOC>
                <h1>Leads...</h1>
            </AppLayoutHOC>
        </ProtectedRouteHoc>
    );
};

export default LeadsComp;
