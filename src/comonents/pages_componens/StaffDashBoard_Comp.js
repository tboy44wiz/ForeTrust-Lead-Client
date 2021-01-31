import React, {useContext} from 'react';

/*==== Import AppStoreContext HOC ====*/
import {AppStoreContext} from "../../contexts/AppContextProvider";

/*==== Import ProtectedRouteHoc HOC ====*/
import ProtectedRouteHoc from '../auth_components/ProtectedRoute_HOC';

//  Import _StaffDashBoard_Comp scss.
import '../../scss/pages_components_scss/_StaffDashBoard_Comp.scss';

//  Import React-Icons.
import {MdEventNote} from "react-icons/md";

//  Import Images.
import ProfileAvatar from '../../assets/images/profile_avatar.png';
import AppLayoutHOC from "../layout_components/AppLayout_HOC";

const StaffDashBoardComp = (props) => {

    const { handleShowHideProfileOption } = useContext(AppStoreContext)

    const goToLeadsComp = () => {
        props.history.push("/leads");
    }

    return (
        <ProtectedRouteHoc>
            <AppLayoutHOC>
                <div className="StaffDashBoardComp">
                    {/*==== OrganizerDashboard  Body Wrapper ====*/}
                    <div className="container staff-dashboard-body__wrapper">

                        {/*==== Page Title ====*/}
                        <h1 className="page__title">Dashboard</h1>

                        {/*==== mCards Wrapper ====*/}
                        <div className="mCards__wrapper">
                            <div
                                onClick={ goToLeadsComp }
                                className="mCard mCard__item item__one">
                                <div>
                                    <h2>12</h2>
                                    <p>Leads</p>
                                </div>
                                <MdEventNote className="mCard__item--icon t-event__icon" />
                            </div>

                            <div className="mCard mCard__item item__two">
                                <div>
                                    <h2>11</h2>
                                    <p>Projects</p>
                                </div>
                                <MdEventNote className="mCard__item--icon c-event__icon" />
                            </div>

                            <div className="mCard mCard__item item__three">
                                <div>
                                    <h2>1</h2>
                                    <p>Upcoming</p>
                                </div>
                                <MdEventNote className="mCard__item--icon un-event__icon" />
                            </div>
                        </div>
                    </div>

                </div>
            </AppLayoutHOC>
        </ProtectedRouteHoc>
    );
};

export default StaffDashBoardComp;
