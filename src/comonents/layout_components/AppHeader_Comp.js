import React, {useContext} from 'react';

/*==== Import AppStoreContext HOC ====*/
import {AppStoreContext} from '../../contexts/AppContextProvider';

//  Import _AppLayout_HOC scss.
import '../../scss/layout_components/_AppLayout_HOC.scss';

//  Import Images.
import ProfileAvatar from '../../assets/images/profile_avatar.png';
import BrandLogo from '../../assets/images/foretrust_logo_teal.png';

const AppHeaderComp = () => {

    const { handleShowHideProfileOption } = useContext(AppStoreContext)

    return (
        <div className="AppHeaderComp">
            <img src={ BrandLogo } className="brand__logo" alt="Brand Logo" />

            <div className="user-name__wrapper">
                <h3 className="admin__name">Admin</h3>
                <span className="dropdown-toggle profile__dropdown">
                    <img src={ ProfileAvatar } alt="Profile User" className="rounded-avatar"/>
                </span>
            </div>
        </div>
    );
};

export default AppHeaderComp;
