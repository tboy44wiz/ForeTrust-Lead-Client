import React, {useCallback, useEffect, useState} from 'react';
import jwt_decode from "jwt-decode";
import { CircleLoader } from "react-spinners";
import { css } from "@emotion/react";

/*==== Import AppStoreContext HOC ====*/
// import { AppStoreContext } from "../../contexts/AppContextProvider";

//  Custom @emotion/core CSS
const customEmotionCSS = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
`;

const ProtectedRouteHOC = (props) => {

    // const {} = useContext(AppStoreContext)

    const [state, setState] = useState({
        isAuthenticated: false
    });

    const checkTokenExpiration = async (staffLoginData) => {

        if (staffLoginData !== null) {
            //  Decode the Token.
            const decodedToken = jwt_decode(staffLoginData.token);

            //  Get the current time.
            const currentTime = new Date() / 1000;
            //  Remove decimal points
            const currentTimeString = Math.trunc(currentTime);

            //  Compare the current time with the expiration time in the decoded token.
            return decodedToken.exp > currentTimeString;
        }
        else {
            return false;
        }
    }
    const checkLoginStatus = useCallback(async () => {
        //  Get Staff Data from the Browsers Local Storage.
        let staffLoginData = await localStorage.getItem("staffData");

        if (staffLoginData !== null) {
            if (await checkTokenExpiration(JSON.parse(staffLoginData))) {
                //  Set to state
                return setState((prevState) => ({
                    ...prevState,
                    isAuthenticated: true,
                }));
            }
            else {
                //  Set to state
                setState((prevState) => ({
                    ...prevState,
                    isAuthenticated: false,
                }));
                localStorage.removeItem("staffData");

                // return props.history.replace("/");
                return window.open("/", '_self');
            }
        }
        else {
            //  Save to state
            setState((prevState) => ({
                ...prevState,
                isAuthenticated: false,
            }));

            // return props.history.replace("/");
            return window.open("/", '_self');
        }
    }, []);

    useEffect(() => {
        // checkLoginStatus();
        (async () => {
            await checkLoginStatus()
        })();
    }, [checkLoginStatus]);


    return (
        <>
            { (state.isAuthenticated) ? (
                props.children
            ) : (
                <CircleLoader
                    css={ customEmotionCSS }
                    size={50}
                    color={"#2cb3de"}
                />
            ) }
        </>
    );
};

export default ProtectedRouteHOC;
