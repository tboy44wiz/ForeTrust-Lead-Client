import React, {useContext, useEffect} from 'react';
import { toast } from 'react-toastify';
import {CircleLoader} from "react-spinners";

//  Import React-Icons
import { FiEdit3 } from "react-icons/fi";

import {css} from "@emotion/react";

/*==== Import AppStoreContext HOC ====*/
import {AppStoreContext} from "../../../contexts/AppContextProvider";

/*==== Import ProtectedRouteHoc and AppLayoutHOC HOC ====*/
import AppLayoutHOC from '../../layout_components/AppLayout_HOC';
import ProtectedRouteHOC from '../../auth_components/ProtectedRoute_HOC';

//  Import React Toastify CSS.
import 'react-toastify/dist/ReactToastify.css';

//  Import _StaffProfile_Comp scss.
import '../../../scss/pages_components_scss/staff/_StaffProfile_Comp.scss'

//  Import Images.
import ProfileAvatar from "../../../assets/images/profile_avatar.png";

//  Custom @emotion/core CSS
const customEmotionCSS = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
`;

const StaffProfileComp = () => {

    // Global State
    const { staff, isLoading, getSingleStaff } = useContext(AppStoreContext);

    useEffect(() => {
        getSingleStaff();
    }, [getSingleStaff]);

    //  React Toast  Custom Methods.
    const warningToast = (message) => {
        return toast.warning(message, { hideProgressBar: true });
    };

    return (
        <ProtectedRouteHOC>

            {
                (!isLoading) ? (
                    <AppLayoutHOC>
                        <div className="StaffProfileComp">

                            {/*==== Staff  Body Wrapper ====*/}
                            <div className="container staff-details-main__wrapper">

                                {/*==== Page Title Wrapper ====*/}
                                <div className="page-title__wrapper">
                                    <h1 className="staff-details-page__title">Staff Details</h1>
                                </div>

                                {/*==== Lead Details Wrapper ====*/}
                                <div className="staff-details-inner__wrapper">

                                    <div className="staff-details-second-inner__wrapper">
                                        {/*==== Left Side ====*/}
                                        <div className="left-side__wrapper">
                                            <p className="staff__role">{ staff.staff_role }</p>

                                            <div>
                                                <h3 className="mb-4 font-weight-bold">Leads</h3>
                                                <div className="leads-numbers__wrapper mb-4">
                                                    <p className="leads__numbers">{ staff.openedLead }</p>
                                                    <span>Opened</span>
                                                </div>

                                                <div className="leads-numbers__wrapper">
                                                    <p className="leads__numbers">{ staff.closedLead }</p>
                                                    <span>Closed</span>
                                                </div>

                                                <div className="leads-numbers__wrapper mt-4">
                                                    <p className="leads__numbers">{ staff.inProgressLead }</p>
                                                    <span>In-progress</span>
                                                </div>

                                                <div className="leads-numbers__wrapper mt-4">
                                                    <p className="leads__numbers">{ staff.dormantLead }</p>
                                                    <span>Dormant</span>
                                                </div>
                                            </div>

                                            <h1 className="staff__name">{ staff.staff_name }</h1>
                                        </div>

                                        {/*==== Right Side ====*/}
                                        <div className="right-side__wrapper">
                                            <div className="edit-icon__wrapper">
                                                <FiEdit3
                                                    onClick={ () => warningToast("You're not allowed to perform this action for now.") }
                                                    className="edit__icon"
                                                />
                                            </div>

                                            <div className="staff-avatar-email__wrapper">
                                                <div>
                                                    <img src={ ProfileAvatar } alt="Profile User" className="rounded-avatar"/>
                                                    <h1 className="staff__name">{ staff.staff_name }</h1>
                                                    <h2 className="staff__email">{ staff.staff_email }</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </AppLayoutHOC>
                ) : (
                    <CircleLoader
                        css={ customEmotionCSS }
                        size={50}
                        color={"#2cb3de"}
                    />
                )
            }
        </ProtectedRouteHOC>
    );
};

export default StaffProfileComp;
