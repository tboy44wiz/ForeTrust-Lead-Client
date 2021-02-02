import React, {useCallback, useEffect, useState} from 'react';
import { Link, withRouter } from "react-router-dom";

//  Import _AppLayout_HOC scss.
import '../../scss/layout_components/_AppLayout_HOC.scss';

//  Import React Icons
import { RiUser6Line, RiLogoutCircleRLine } from 'react-icons/ri';

//  Import Images.
import ProfileAvatar from '../../assets/images/profile_avatar.png';
import BrandLogo from '../../assets/images/foretrust_logo_teal.png';

const AppHeaderComp = (props) => {

    const [state, setState] = useState({
        staffName: "",
        isShowHideProfileDropdown: false,
    });

    const getStaffData = useCallback(async () => {
        const staffLoginData = await localStorage.getItem('staffData');
        const staffName = JSON.parse(staffLoginData).staff_name;

        setState((prevState) => ({
            ...prevState,
            staffName: staffName,
        }))
    }, [])

    useEffect(() => {
        (async () => {
            await getStaffData();
        })();
    }, [getStaffData]);

    const handleShowHideProfileOption = () => {
        setState((prevState) => ({
            ...prevState,
            isShowHideProfileDropdown: !state.isShowHideProfileDropdown,
        }));
    }
    const logoutUser = () => {
        localStorage.removeItem('staffData');
        props.history.replace("/");
    };

    return (
        <div className="AppHeaderComp">
            <img src={ BrandLogo } className="brand__logo" alt="Brand Logo" />

            <div className="user-name__wrapper">
                <p className="home__menu"><Link to="/staff_dashboard" >Home</Link></p>
                <span onClick={ handleShowHideProfileOption } className="dropdown-toggle profile__dropdown">
                    <img src={ ProfileAvatar } alt="Profile User" className="rounded-avatar"/>
                </span>
                <h3 className="admin__name">{state.staffName}</h3>
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

export default withRouter(AppHeaderComp);
