import React from 'react';
import {Link} from "react-router-dom";

//  Import _AppLayout_HOC scss.
import '../../scss/layout_components/_AppLayout_HOC.scss';

const AppFooterComp = () => {
    const year = new Date().getFullYear();

    return (
        <div className="AppFooterComp">
            <p className="copy-right">
                Copy &#169; {year}
                <a href="http://www.foretrustgroup.com" target="_blank" rel="noreferrer">
                    ForeTrust Digital Consulting Limited.
                </a>
            </p>
        </div>
    );
};

export default AppFooterComp;
