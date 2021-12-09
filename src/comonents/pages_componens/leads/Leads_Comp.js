import React, {useContext, useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import ReactTooltip from 'react-tooltip';
import moment from "moment";

//  Import React Icons
import { AiOutlineDelete } from "react-icons/ai";
import { BsArrowUpDown } from "react-icons/bs";
// import { FiEye } from "react-icons/fi";

import {CircleLoader} from "react-spinners";
import {css} from "@emotion/react";

/*==== Import AppStoreContext HOC ====*/
import { AppStoreContext } from "../../../contexts/AppContextProvider";

/*==== Import ProtectedRouteHoc and AppLayoutHOC HOC ====*/
import ProtectedRouteHOC from "../../auth_components/ProtectedRoute_HOC";
import AppLayoutHOC from "../../layout_components/AppLayout_HOC";

//  Import _Leads_Comp scss.
import '../../../scss/pages_components_scss/leads/_Leads_Comp.scss';

import LeadModalComp from "../../layout_components/LeadModal_Comp";

//  Custom @emotion/core CSS
const customEmotionCSS = css`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-40%, -50%)
`;

const LeadsComp = (props) => {

    // Global State
    const { isLoading, leads, handleFetchLeads, deleteLead, handleCreateSingleLead } = useContext(AppStoreContext);

    //  Internal State.
    const [state, setState] = useState({
        leadId: "",
        showDeleteModal: false,
    });

    useEffect(() => {
        handleFetchLeads();
    }, [handleFetchLeads]);


    /*==== Delete Lead Modal ====*/
    const handleShowDeleteLeadModal = (event, leadId) => {
        event.stopPropagation();
        setState((prevState) => ({
            ...prevState,
            leadId: leadId,
            showDeleteModal: true,
        }));
    };
    const handleCloseDeleteModal = () => {
        setState((prevState) => ({
            ...prevState,
            showDeleteModal: false,
        }));
    };
    const handleDeleteLead = (leadId) => {
        deleteLead(leadId);
        handleCloseDeleteModal();
    };

    const goToLeadDetailScreen = (leadId) => {
        props.history.push(`/leads_details/${leadId}`);
    };

    return (
        <ProtectedRouteHOC>
            <AppLayoutHOC>
                <div className="LeadsComp">

                    {/*==== Leads  Body Wrapper ====*/}
                    <div className="container leads-main__wrapper">

                        {/*==== Page Title ====*/}
                        <div className="page-title__wrapper">
                            <h1 className="lead-page__title">Leads</h1>
                            <button
                                onClick={ handleCreateSingleLead }
                                className="add-lead__button"
                                data-tip="Add a single lead."
                            >Add a Lead</button>
                        </div>

                        {/*==== Table Wrapper ====*/}
                        <div className="table__wrapper">
                            <table className="leads__table">
                                {/*==== Table Head ====*/}
                                <thead className="table__head">
                                <tr className="table__row">
                                    <th>S/N</th>
                                    <th>Names <BsArrowUpDown
                                        className="ascend-descend__icon"
                                        data-tip="Alphabetically view in ascending or descending order."
                                    />
                                    </th>
                                    <th>Phone Number</th>
                                    <th>Email</th>
                                    <th>State <BsArrowUpDown
                                        className="ascend-descend__icon"
                                        data-tip="Alphabetically view in ascending or descending order."
                                    />
                                    </th>
                                    <th>Address</th>
                                    <th>Owner</th>
                                    <th>Created Date</th>
                                    <th>Purpose</th>
                                    <th className="lead-status__td">Status</th>
                                    <th>Action</th>
                                </tr>
                                </thead>

                                {/*==== Table Body ====*/}
                                {
                                    (!isLoading) ? (
                                        <tbody className="table__body">
                                        {
                                            leads.map((eachLead, index) => (
                                                <tr key={ eachLead.id }
                                                    onClick={ () => { goToLeadDetailScreen(eachLead.id) } }
                                                    className="table__row">
                                                    <td>{ index + 1 }</td>
                                                    <td>{ eachLead.leads_name }</td>
                                                    <td>{ eachLead.leads_phone }</td>
                                                    <td>{ eachLead.leads_email }</td>
                                                    <td>{ eachLead.leads_state }</td>
                                                    <td>{ eachLead.leads_address }</td>
                                                    <td>{ eachLead.staff_name }</td>
                                                    <td>{ moment(eachLead.createdAt).format("YYYY-MM-DD hh:mm A") }</td>
                                                    <td>{ eachLead.purpose }</td>
                                                    <td className="lead-status__td">
                                                        <span className="lead-status" style={{
                                                            backgroundColor: (eachLead.status === "Dormant") ? "#8c8c8c" : (eachLead.status === "In progress") ? "#ff9114" : "#00AB00"
                                                        }}>
                                                            { eachLead.status }
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="action-button-wrapper">
                                                            {/*<FiEye
                                                                onClick={ () => { goToLeadDetailScreen(eachLead.id) } }
                                                                onClick={ (event) => handleEditSingleLead(event, eachLead.id) }
                                                                className="eye__icon"
                                                                data-tip="View lead"
                                                            />*/}
                                                            <AiOutlineDelete
                                                                onClick={ (event) => handleShowDeleteLeadModal(event, eachLead.id) }
                                                                className="delete__icon"
                                                                data-tip="Delete lead"
                                                            />
                                                            <ReactTooltip
                                                                place="bottom"
                                                                backgroundColor="rgba(255, 74, 26, 0.5)"
                                                                effect="float"
                                                                className="react-tool-tip"
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    ) : (
                                        <tbody className="table__body">
                                        <tr>
                                            <td>
                                                <CircleLoader
                                                    css={ customEmotionCSS }
                                                    size={50}
                                                    color={"#2cb3de"}
                                                />
                                            </td>
                                        </tr>
                                        </tbody>
                                    )
                                }
                            </table>
                        </div>
                    </div>



                    {/*==== Modal Component ====*/}
                    <LeadModalComp />

                    {/*==== Confirm Delete Dialog Modal ====*/}
                    <Modal
                        show={ state.showDeleteModal }
                        onHide={ handleCloseDeleteModal }
                        backdrop="static"
                        keyboard={false}
                        className="confirm__modal"
                    >
                        <Modal.Body className="confirm-modal__body">
                            <h1 className="lead__heading">Confirm Delete?</h1>
                            <p>Are you sure you want to continue this action?</p>
                        </Modal.Body>

                        <Modal.Footer className="modal__footer">
                            <Button onClick={ handleCloseDeleteModal } className="button cancel__button">No</Button>
                            <Button variant="primary" onClick={ () => handleDeleteLead(state.leadId) } className="button submit__button">Yes</Button>
                        </Modal.Footer>
                    </Modal>
                </div>

            </AppLayoutHOC>
        </ProtectedRouteHOC>
    );
};

export default LeadsComp;
