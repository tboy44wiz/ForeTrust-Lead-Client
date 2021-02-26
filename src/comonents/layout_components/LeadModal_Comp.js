import React, {useContext} from 'react';
import {Button, Modal} from "react-bootstrap";
import {AppStoreContext} from "../../contexts/AppContextProvider";

const LeadModalComp = () => {

    const { lead, modalType, handleLeadInputChange, createLead, updateLead, showCancelModal, showLeadModal,
        handleShowCancelModal, handleCloseLeadModal, handleCloseCancelModal } = useContext(AppStoreContext);
    // console.log(`LEAD::: ${JSON.stringify(lead)}`);


    return (
        <div className="LeadModalComp">

            {/*====Create and Edit Lead Modal ====*/}
            <Modal
                show={ showLeadModal }
                onHide={ handleCloseLeadModal }
                backdrop="static"
                size="lg"
                keyboard={ false }
                centered
                className="lead__modal"
            >
                {
                    (modalType === "createModal") ? (
                        <Modal.Body className="modal__body">
                            <h1 className="lead-form__heading">Create a Lead.</h1>
                            <form onSubmit={ event => createLead(event) } className='lead__form'>
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

                                <div className="form-group lead__phone">
                                    <label htmlFor="leadPhone">Lead phone</label>
                                    <input type="text" id="leadPhone" name="leads_phone" value={ lead.leads_phone }
                                           onChange={ (event => handleLeadInputChange(event)) }
                                           className="form-control"
                                           placeholder="Phone number of the lead." />
                                </div>

                                <div className="form-group lead__email">
                                    <label htmlFor="leadEmail">Lead email</label>
                                    <input type="email" id="leadEmail" name="leads_email" value={ lead.leads_email }
                                           onChange={ (event => handleLeadInputChange(event)) }
                                           className="form-control"
                                           placeholder="Email of the lead." />
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

                                <div className="form-group lead__phone lead_source">
                                    <label htmlFor="leadSource">Lead source</label>
                                    <small className="label__hint">(How they got to know about the company)</small>
                                    <select
                                        id="leadSource"
                                        name="leads_source"
                                        value={ lead.leads_source }
                                        onChange={ (event => handleLeadInputChange(event)) }
                                        className="form-control"
                                    >
                                        <option value="">Select Source</option>
                                        <option value="Friends">Friends</option>
                                        <option value="Email">Email</option>
                                        <option value="Twitter">Twitter</option>
                                        <option value="FaceBook">FaceBook</option>
                                        <option value="Instagram">Instagram</option>
                                        <option value="WhatsApp">WhatsApp</option>
                                        <option value="Television">Television</option>
                                        <option value="Radio">Radio</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>

                                <div className="form-group status">
                                    <label htmlFor="status">Status</label>
                                    <small className="label__hint">(Default = In progress)</small>
                                    <select
                                        name="status"
                                        value={ lead.status }
                                        onChange={ (event => handleLeadInputChange(event)) }
                                        className="form-control"
                                    >
                                        <option value="">Select status</option>
                                        <option value="Dormant">Dormant</option>
                                        <option value="In progress">In progress</option>
                                        <option value="Done">Done</option>
                                    </select>
                                </div>

                                <div className="form-group purpose">
                                    <label htmlFor="leadPurpose">Event purpose</label>
                                    <textarea id="leadPurpose" rows="4" name="purpose" value={ lead.purpose }
                                              onChange={ (event => handleLeadInputChange(event)) }
                                              className="form-control"
                                              placeholder="Leads purpose" />
                                </div>

                                <div className="button__wrapper">
                                    <Button onClick={ handleShowCancelModal } className="button cancel__button">Cancel</Button>
                                    <Button type="submit" className="button submit__button">Submit</Button>
                                </div>
                            </form>
                        </Modal.Body>
                    ) : (
                        <Modal.Body className="modal__body">
                            <h1 className="lead-form__heading">Edit a Lead.</h1>
                            <form onSubmit={ event => updateLead(event, lead.id) } className='lead__form'>
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

                                <div className="form-group lead__phone lead_source">
                                    <label htmlFor="leadSource">Lead source</label>
                                    <small className="label__hint">(How they got to know about the company)</small>
                                    <select
                                        id="leadSource"
                                        name="leads_source"
                                        value={ lead.leads_source }
                                        onChange={ (event => handleLeadInputChange(event)) }
                                        className="form-control"
                                    >
                                        <option value="">Select Source</option>
                                        <option value="Friends">Friends</option>
                                        <option value="Email">Email</option>
                                        <option value="Twitter">Twitter</option>
                                        <option value="FaceBook">FaceBook</option>
                                        <option value="Instagram">Instagram</option>
                                        <option value="WhatsApp">WhatsApp</option>
                                        <option value="Television">Television</option>
                                        <option value="Radio">Radio</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>

                                <div className="form-group status">
                                    <label htmlFor="status">Status</label>
                                    <small className="label__hint">(Default = In progress)</small>
                                    <select
                                        name="status"
                                        value={ lead.status }
                                        onChange={ (event => handleLeadInputChange(event)) }
                                        className="form-control"
                                    >
                                        <option value="">Select status</option>
                                        <option value="Dormant">Dormant</option>
                                        <option value="In progress">In progress</option>
                                        <option value="Done">Done</option>
                                    </select>
                                </div>

                                <div className="form-group purpose">
                                    <label htmlFor="leadPurpose">Event purpose</label>
                                    <textarea id="leadPurpose" rows="4" name="purpose" value={ lead.purpose }
                                              onChange={ (event => handleLeadInputChange(event)) }
                                              className="form-control"
                                              placeholder="Leads purpose" />
                                </div>

                                <div className="button__wrapper">
                                    <Button onClick={ handleShowCancelModal } className="button cancel__button">Cancel</Button>
                                    <Button type="submit" className="button submit__button">Submit</Button>
                                </div>
                            </form>
                        </Modal.Body>
                    )
                }
            </Modal>

            {/*==== Confirm Cancel Dialog Modal ====*/}
            <Modal
                show={ showCancelModal }
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
        </div>
    );
};

export default LeadModalComp;
