import React, {useState} from 'react';
import {Link} from "react-router-dom";

//  Import _AppLayout_HOC scss.
import '../../scss/layout_components/_AppLayout_HOC.scss';

//  Import React Icons
import { RiUser6Line, RiLogoutCircleRLine } from 'react-icons/ri';

//  Import Images.
import ProfileAvatar from '../../assets/images/profile_avatar.png';
import BrandLogo from '../../assets/images/foretrust_logo_teal.png';

const AppHeaderComp = () => {

    const [state, setState] = useState({
        isShowHideProfileDropdown: false,
    });

    const handleShowHideProfileOption = () => {
        setState((prevState) => ({
            ...prevState,
            isShowHideProfileDropdown: !state.isShowHideProfileDropdown,
        }));
    }
    const logoutUser = () => {
        localStorage.clear();
        this.props.history.replace("/login")
    }

    return (
        <div className="AppHeaderComp">
            <img src={ BrandLogo } className="brand__logo" alt="Brand Logo" />

            <div className="user-name__wrapper">
                <h3 className="admin__name">Admin</h3>
                <span onClick={ handleShowHideProfileOption } className="dropdown-toggle profile__dropdown">
                    <img src={ ProfileAvatar } alt="Profile User" className="rounded-avatar"/>
                </span>
            </div>
            {
                (state.isShowHideProfileDropdown) ? (
                    <div className="drop-down-menu dropdown-menu-right">
                        <Link to="#" className="profile-dropdown__item has-icon">
                            <RiUser6Line className="dropdown__icon" /> Profile
                        </Link>
                        <Link to="#" onClick={ logoutUser } className="profile-dropdown__item has-icon">
                            <RiLogoutCircleRLine className="dropdown__icon" /> Logout
                        </Link>
                    </div>
                ) : (
                    <></>
                )
            }
        </div>
    );
};

export default AppHeaderComp;
