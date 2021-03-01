import React, {useContext, useEffect} from 'react';
import { toast } from 'react-toastify';

//  Import React-Icons.
import {AiOutlineProject} from "react-icons/ai";
import {MdEventNote} from "react-icons/md";
import {SiGoogleads} from "react-icons/si";

import {css} from "@emotion/react";

/*==== Import AppStoreContext HOC ====*/
import {AppStoreContext} from "../../../contexts/AppContextProvider";

/*==== Import ProtectedRouteHoc and AppLayoutHOC HOC ====*/
import ProtectedRouteHOC from '../../auth_components/ProtectedRoute_HOC';
import AppLayoutHOC from "../../layout_components/AppLayout_HOC";

//  Import React Toastify CSS.
import 'react-toastify/dist/ReactToastify.css';

//  Import _StaffDashBoard_Comp scss.
import '../../../scss/pages_components_scss/staff/_StaffDashBoard_Comp.scss';

const StaffDashBoardComp = (props) => {

    //  Global State.
    const { leads, handleFetchLeads } = useContext(AppStoreContext);

    useEffect(() => {
        handleFetchLeads();
    }, [handleFetchLeads]);

    //  React Toast  Custom Methods.
    const warningToast = (message) => {
        return toast.warning(message, { hideProgressBar: true });
    };


    const goToLeadsComp = () => {
        props.history.push("/leads");
    };

    return (
        <ProtectedRouteHOC>
            <AppLayoutHOC>
                <div className="StaffDashBoardComp">
                    {/*==== StaffDashboard  Body Wrapper ====*/}
                    <div className="container staff-dashboard-main__wrapper">

                        {/*==== Page Title ====*/}
                        <h1 className="staff-dashboard-page__title">Dashboard</h1>

                        {/*==== mCards Wrapper ====*/}
                        <div className="mCards__wrapper">
                            <div
                                onClick={ goToLeadsComp }
                                className="mCard mCard__item item__one">
                                <div>
                                    <h2>{ leads.length }</h2>
                                    <p>Lead(s)</p>
                                </div>
                                <SiGoogleads className="mCard__item--icon t-event__icon" />
                            </div>

                            <div
                                onClick={ () => warningToast("This feature unavailable.") }
                                className="mCard mCard__item item__two">
                                <div>
                                    <h2>0</h2>
                                    <p>Projects</p>
                                </div>
                                <AiOutlineProject className="mCard__item--icon c-event__icon" />
                            </div>

                            <div
                                onClick={ () => warningToast("This feature unavailable.") }
                                className="mCard mCard__item item__three">
                                <div>
                                    <h2>0</h2>
                                    <p>Upcoming</p>
                                </div>
                                <MdEventNote className="mCard__item--icon un-event__icon" />
                            </div>
                        </div>
                    </div>

                </div>
            </AppLayoutHOC>
        </ProtectedRouteHOC>
    );
};

export default StaffDashBoardComp;
