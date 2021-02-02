import React, {useContext, useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import ReactTooltip from 'react-tooltip';
import {CircleLoader} from "react-spinners";
import {css} from "@emotion/react";

/*==== Import AppStoreContext HOC ====*/
import { AppStoreContext } from "../../contexts/AppContextProvider";

/*==== Import ProtectedRouteHoc and AppLayoutHOC HOC ====*/
import ProtectedRouteHOC from "../auth_components/ProtectedRoute_HOC";
import AppLayoutHOC from "../layout_components/AppLayout_HOC";

//  Import _Leads_Comp scss.
import '../../scss/pages_components_scss/_Leads_Comp.scss';

//  Import React Icons
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { BsArrowUpDown } from "react-icons/bs";

//  Custom @emotion/core CSS
const customEmotionCSS = css`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-40%, -50%)
`;

const LeadsComp = () => {

    const { isLoading, isEditMood, lead, leads,
        handleFetchLeads, deleteLead, handleLeadInputChange, extractSingleLead, createLead, updateLead,
        clearFormInputFields } = useContext(AppStoreContext);

    const [state, setState] = useState({
        leadId: "",
        showLeadModal: false,
        showCancelModal: false,
        showDeleteModal: false,
    });

    const handleShowLeadModal = () => {
        setState((prevState) => ({
            ...prevState,
            showLeadModal: true,
        }))
    }
    const handleCloseLeadModal = () => {
        handleCloseCancelModal();
        setState((prevState) => ({
            ...prevState,
            showLeadModal: false,
        }));
    };

    const ShowCancelModal = () => {
        setState((prevState) => ({
            ...prevState,
            showCancelModal: true
        }));
    };
    const handleCloseCancelModal = () => {
        // Clear the Form.
        clearFormInputFields();

        setState((prevState) => ({
            ...prevState,
            showCancelModal: false,
        }));
    };

    const handleLeadSubmit = (event) => {
        createLead(event);
        handleCloseLeadModal();
    };
    const handleLeadUpdate = (event, leadId) => {
        updateLead(event, leadId);
        handleCloseLeadModal();
    };

    /*==== Delete Lead Modal ====*/
    const handleShowDeleteLeadModal = (leadId) => {
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
    }

    const handleEditSingleLead = (leadId) => {
        //  Call the "editSingleLead" function.
        extractSingleLead(leadId);

        //  Then open the handleShowLeadModal with Edit features.
        handleShowLeadModal();
    };

    useEffect(() => {
        handleFetchLeads();
    }, [handleFetchLeads]);

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
                                onClick={ handleShowLeadModal }
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
                                        <th>Purpose</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                {/*==== Table Body ====*/}
                                {
                                    (!isLoading) ? (
                                        <tbody className="table__body">
                                        {
                                            leads.map((eachLead, index) => (
                                                <tr key={ eachLead.id } className="table__row">
                                                    <td>{ index + 1 }</td>
                                                    <td>{ eachLead.leads_name }</td>
                                                    <td>{ eachLead.leads_phone }</td>
                                                    <td>{ eachLead.leads_email }</td>
                                                    <td>{ eachLead.leads_state }</td>
                                                    <td>{ eachLead.leads_address }</td>
                                                    <td>{ eachLead.purpose }</td>
                                                    <td>
                                                        <div className="action-button-wrapper">
                                                            <FiEdit3 onClick={ () => handleEditSingleLead(eachLead.id) } className="edit__icon" data-tip="Edit lead" />
                                                            <AiOutlineDelete onClick={ () => handleShowDeleteLeadModal(eachLead.id) } className="delete__icon" data-tip="Delete lead"/>
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


                    {/*====Create Event Modal ====*/}
                    <Modal
                        show={ state.showLeadModal }
                        onHide={ handleCloseLeadModal }
                        backdrop="static"
                        size="lg"
                        keyboard={ false }
                        centered
                        className="lead__modal"
                    >
                        <Modal.Body className="modal__body">
                            <h1 className="lead-form__heading">Create a Lead.</h1>
                            {
                                (!isEditMood) ? (
                                    <form onSubmit={ event => handleLeadSubmit(event) } className='lead__form'>
                                        <div className="form-title-and-description__wrapper">
                                            <h3 className="form__title">Leads Info</h3>
                                            <p className="form__description">Complete leads creation form.</p>
                                        </div>

                                        <div className="form-group lead__name">
                                            <label htmlFor="leadName">Lead name</label>
                                            <input type="text" id="leadName" name="leads_name" value={ lead.leads_name }
                                                   onChange={ (event => handleLeadInputChange(event)) }
                                                   className="form-control"
                                                   placeholder="Name of the lead." />
                                        </div>

                                        <div className="form-group lead__email">
                                            <label htmlFor="leadEmail">Lead email</label>
                                            <input type="email" id="leadEmail" name="leads_email" value={ lead.leads_email }
                                                   onChange={ (event => handleLeadInputChange(event)) }
                                                   className="form-control"
                                                   placeholder="Email of the lead." />
                                        </div>

                                        <div className="form-group lead__phone">
                                            <label htmlFor="leadPhone">Lead phone</label>
                                            <input type="text" id="leadPhone" name="leads_phone" value={ lead.leads_phone }
                                                   onChange={ (event => handleLeadInputChange(event)) }
                                                   className="form-control"
                                                   placeholder="Phone number of the lead." />
                                        </div>

                                        <div className="form-group lead__state">
                                            <label htmlFor="leadState">Lead state</label>
                                            <input type="text" id="leadState" name="leads_state" value={ lead.leads_state }
                                                   onChange={ (event => handleLeadInputChange(event)) }
                                                   className="form-control"
                                                   placeholder="State of the lead." />
                                        </div>

                                        <div className="form-group lead__address">
                                            <label htmlFor="leadAddress">Lead address</label>
                                            <input type="text" id="leadAddress" name="leads_address" value={ lead.leads_address }
                                                   onChange={ (event => handleLeadInputChange(event)) }
                                                   className="form-control"
                                                   placeholder="Address of the lead." />
                                        </div>

                                        <div className="form-group purpose">
                                            <label htmlFor="leadPurpose">Event purpose</label>
                                            <textarea id="leadPurpose" rows="4" name="purpose" value={ lead.purpose }
                                                      onChange={ (event => handleLeadInputChange(event)) }
                                                      className="form-control"
                                                      placeholder="Leads purpose" />
                                        </div>

                                        <div className="button__wrapper">
                                            <Button onClick={ ShowCancelModal } className="button cancel__button">Cancel</Button>
                                            <Button type="submit" className="button submit__button">Submit</Button>
                                        </div>
                                    </form>
                                ) : (
                                    <form onSubmit={ event => handleLeadUpdate(event, lead.id) } className='lead__form'>
                                        <div className="form-title-and-description__wrapper">
                                            <h3 className="form__title">Leads Info</h3>
                                            <p className="form__description">Complete leads creation form.</p>
                                        </div>

                                        <div className="form-group lead__name">
                                            <label htmlFor="leadName">Lead name</label>
                                            <input type="text" id="leadName" name="leads_name" value={ lead.leads_name }
                                                   onChange={ (event => handleLeadInputChange(event)) }
                                                   className="form-control"
                                                   placeholder="Name of the lead." />
                                        </div>

                                        <div className="form-group lead__email">
                                            <label htmlFor="leadEmail">Lead email</label>
                                            <input type="email" id="leadEmail" name="leads_email" value={ lead.leads_email }
                                                   onChange={ (event => handleLeadInputChange(event)) }
                                                   className="form-control"
                                                   placeholder="Email of the lead." />
                                        </div>

                                        <div className="form-group lead__phone">
                                            <label htmlFor="leadPhone">Lead phone</label>
                                            <input type="text" id="leadPhone" name="leads_phone" value={ lead.leads_phone }
                                                   onChange={ (event => handleLeadInputChange(event)) }
                                                   className="form-control"
                                                   placeholder="Phone number of the lead." />
                                        </div>

                                        <div className="form-group lead__state">
                                            <label htmlFor="leadState">Lead state</label>
                                            <input type="text" id="leadState" name="leads_state" value={ lead.leads_state }
                                                   onChange={ (event => handleLeadInputChange(event)) }
                                                   className="form-control"
                                                   placeholder="State of the lead." />
                                        </div>

                                        <div className="form-group lead__address">
                                            <label htmlFor="leadAddress">Lead address</label>
                                            <input type="text" id="leadAddress" name="leads_address" value={ lead.leads_address }
                                                   onChange={ (event => handleLeadInputChange(event)) }
                                                   className="form-control"
                                                   placeholder="Address of the lead." />
                                        </div>

                                        <div className="form-group purpose">
                                            <label htmlFor="leadPurpose">Event purpose</label>
                                            <textarea id="leadPurpose" rows="4" name="purpose" value={ lead.purpose }
                                                      onChange={ (event => handleLeadInputChange(event)) }
                                                      className="form-control"
                                                      placeholder="Leads purpose" />
                                        </div>

                                        <div className="button__wrapper">
                                            <Button onClick={ ShowCancelModal } className="button cancel__button">Cancel</Button>
                                            <Button type="submit" className="button submit__button">Submit</Button>
                                        </div>
                                    </form>
                                )
                            }
                        </Modal.Body>
                    </Modal>

                    {/*==== Confirm Cancel Dialog Modal ====*/}
                    <Modal
                        show={ state.showCancelModal }
                        onHide={ handleCloseCancelModal }
                        backdrop="static"
                        keyboard={false}
                        className="confirm__modal"
                    >
                        <Modal.Body className="confirm-modal__body">
                            <h1 className="lead__heading">Confirm Cancel?</h1>
                            <p>Are you sure you want to continue this action?</p>
                        </Modal.Body>

                        <Modal.Footer className="modal__footer">
                            <Button onClick={ handleCloseCancelModal } className="button cancel__button">No</Button>
                            <Button variant="primary" onClick={ handleCloseLeadModal } className="button submit__button">Yes</Button>
                        </Modal.Footer>
                    </Modal>

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
