import React, {useContext, useEffect, useState} from 'react';
import moment from "moment";
import {CircleLoader} from "react-spinners";

//  Import React-Icons
import { MdAdd } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { RiSendPlaneFill, RiCloseFill } from "react-icons/ri";

import { css } from "@emotion/react";

/*==== Import AppStoreContext HOC ====*/
import {AppStoreContext} from "../../../contexts/AppContextProvider";

/*==== Import ProtectedRouteHoc and AppLayoutHOC HOC ====*/
import AppLayoutHOC from "../../layout_components/AppLayout_HOC";
import ProtectedRouteHOC from "../../auth_components/ProtectedRoute_HOC";

//  Import _LeadDetails_Comp scss.
import '../../../scss/pages_components_scss/leads/_LeadDetails_Comp.scss';
import LeadModalComp from "../../layout_components/LeadModal_Comp";

//  Custom @emotion/core CSS
const customEmotionCSS = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
`;

const LeadDetailsComp = (props) => {

    // Global State
    const { leadDetails, isLoading, note, handleFetchSingleLead, handleInputChange, createNote, getSelectedNote, updateNote, deleteNote,
        clearNoteInputField, handleEditSingleLead} = useContext(AppStoreContext);

    //  Internal State.
    const [state, setState] = useState({
        showWriteNote: false,
        isShowHideNoteOptionDropdown: false,
        indexClicked: "",
        noteId: "",
        staffId: "",
        noteType: "createNote",
    });


    useEffect(() => {
        const { id } = props.match.params;

        handleFetchSingleLead(id);
    }, [handleFetchSingleLead, props.match.params]);


    const handleShowWriteNote = () => {
        clearNoteInputField();

        setState(prevState => ({
            ...prevState,
            showWriteNote: true,
            noteType: "createNote",
        }));
    };
    const handleHideWriteNote = () => {
        setState(prevState => ({
            ...prevState,
            showWriteNote: false,
        }));
    };

    const handleShowHideNoteOption = (index) => {
        setState(prevState => ({
            ...prevState,
            isShowHideNoteOptionDropdown: !state.isShowHideNoteOptionDropdown,
            indexClicked: index,
        }));
    };

    const handleUpdateNoteOption = (event, noteId, staffId) => {
        getSelectedNote(noteId);
        // console.log(noteId);
        setState(prevState => ({
            ...prevState,
            showWriteNote: true,
            isShowHideNoteOptionDropdown: false,
            noteId: noteId,
            staffId: staffId,
            noteType: "updateNote",
        }));
    };
    const handleUpdateNote = (event, noteId) => {
        const staffId = state.staffId;
        updateNote(event, noteId, staffId);
        setState(prevState => ({
            ...prevState,
            isShowHideNoteOptionDropdown: false,
            noteType: "createNote",
        }));
    };
    const handleDeleteNoteOption = (noteId, staffId) => {
        deleteNote(noteId, staffId);
        setState(prevState => ({
            ...prevState,
            isShowHideNoteOptionDropdown: false,
        }));
    };


    return (
        <ProtectedRouteHOC>
            {
                (!isLoading) ? (
                    <AppLayoutHOC>
                        <div className="LeadDetailsComp">

                            {/*==== Leads  Body Wrapper ====*/}
                            <div className="container lead-details-main__wrapper">

                                {/*==== Page Title Wrapper ====*/}
                                <div className="page-title__wrapper">
                                    <h1 className="lead-details-page__title">Lead Details</h1>
                                </div>

                                {/*==== Lead Details Wrapper ====*/}
                                <div className="leads-details-inner__wrapper mCard">

                                    {/*==== Left Side ====*/}
                                    <div className="left-side__wrapper">
                                        <div className="leads-details__wrapper mCard">
                                            <h1 className="lead__avatar">{ leadDetails.leads_name.slice()[0] }</h1>
                                            <div className="name-email__wrapper">
                                                <h1>{ leadDetails.leads_name }</h1>
                                                <p>{ leadDetails.leads_phone }</p>
                                            </div>
                                        </div>

                                        <div className="details__wrapper mCard">
                                            <div className="detail-title-FAB__wrapper">
                                                <h3 className="detail__title">Details</h3>
                                                <FiEdit3
                                                    onClick={ (event) => handleEditSingleLead(event, leadDetails.id) }
                                                    className="edit-detail-options__FAB"
                                                />
                                            </div>
                                            <ul className="details__list">
                                                <li className="details__list-item">
                                                    <strong>Name:</strong> { leadDetails.leads_name }
                                                </li>
                                                <li className="details__list-item">
                                                    <strong>Phone:</strong> { leadDetails.leads_phone }
                                                </li>
                                                <li className="details__list-item">
                                                    <strong>Email:</strong> { leadDetails.leads_email }
                                                </li>
                                                <li className="details__list-item">
                                                    <strong>Address:</strong> { leadDetails.leads_address }
                                                </li>
                                                <li className="details__list-item">
                                                    <strong>State:</strong> { leadDetails.leads_state }
                                                </li>
                                                <li className="details__list-item">
                                                    <strong>Source:</strong> { leadDetails.leads_source }
                                                </li>
                                                <li className="details__list-item">
                                                    <strong>Purpose:</strong> { leadDetails.purpose }
                                                </li>
                                                <li className="details__list-item">
                                                    <strong>Owner:</strong> { leadDetails.staff.staff_name }
                                                </li>
                                                <li className="details__list-item">
                                                    <strong>Created Date:</strong> { moment(leadDetails.createdAt).format("YYYY-MM-DD, hh:mm A") }
                                                </li>
                                                <li className="details__list-item">
                                                    <strong>Status:</strong>
                                                        <span style={{
                                                            backgroundColor: (leadDetails.status === "Dormant") ? "#8c8c8c" : (leadDetails.status === "In progress") ? "#ff9114" : "#00AB00"
                                                        }}>
                                                        { leadDetails.status }
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>


                                    {/*==== Right Side ====*/}
                                    <div className="right-side__wrapper">
                                        <div className="notes-main__wrapper">
                                            <div className="note-title__wrapper">
                                                <h3 className="note__title">Notes</h3>
                                                <div className="add-note-FAB__wrapper">
                                                    <span className="add-note__text">Add Note</span>
                                                    <MdAdd onClick={ handleShowWriteNote } className="add-note__FAB" />
                                                </div>
                                            </div>

                                            <hr className="mx-1"/>

                                            {/*==== Note List Wrapper ====*/}
                                            <div className="note-list__wrapper">

                                                {/*==== Note List ====*/}
                                                <ul className="note__list">
                                                    {
                                                        (leadDetails.notes.length) ? (
                                                            leadDetails.notes.map((eachNote, index) => (
                                                                <li key={ eachNote.id } className="note__list--item">
                                                                    <div>
                                                                        <div className="note-options__wrapper">
                                                                            <p>{ eachNote.note }</p>
                                                                            <BiDotsVerticalRounded onClick={ () => handleShowHideNoteOption(index) } className="note-options__FAB" />
                                                                            {
                                                                                (state.isShowHideNoteOptionDropdown && state.indexClicked === index) ? (
                                                                                    <div className="drop-down-menu dropdown-menu-right">
                                                                                        <div onClick={ (event) => handleUpdateNoteOption(event, eachNote.id, eachNote.staff_id) } className="dropdown__item has-icon">
                                                                                            <FiEdit3 className="dropdown__icon" /> Edit
                                                                                        </div>
                                                                                        <div onClick={ () => handleDeleteNoteOption(eachNote.id, eachNote.staff_id) } className="dropdown__item has-icon">
                                                                                            <AiOutlineDelete className="dropdown__icon" /> Delete
                                                                                        </div>
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )
                                                                            }
                                                                        </div>
                                                                        <div>
                                                                            <strong>Date: </strong> { moment(eachNote.updatedAt).format("YYYY-MM-DD, hh:mm A") }
                                                                            <strong className="ml-5">By: </strong> { eachNote.staff_name }
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <p style={{ textAlign: "center" }}>No Note Created.</p>
                                                        )
                                                    }
                                                </ul>

                                                {/*==== Write Note ====*/}
                                                <div className={(state.showWriteNote) ? ("write-note__wrapper") : ("hideWriteNote")}>
                                                    <div className="write-note-title__wrapper">
                                                        <strong className="write-note__title">Write a note</strong>
                                                        <RiCloseFill onClick={ handleHideWriteNote } className="write-note-close__FAB" />
                                                    </div>
                                                    {
                                                        (state.noteType === "createNote") ? (
                                                            <form
                                                                onSubmit={ event => createNote(event) }
                                                                className="write-note-inner__wrapper"
                                                            >
                                                                <input type="text" name="note"
                                                                       value={ note }
                                                                       onChange={ (event => handleInputChange(event)) }
                                                                       className="form-control note__input"
                                                                       placeholder="Write note here."
                                                                />
                                                                <RiSendPlaneFill
                                                                    type="submit"
                                                                    onClick={ event => createNote(event) }
                                                                    className="send-note__FAB"
                                                                />
                                                            </form>
                                                        ) : (
                                                            <form
                                                                onSubmit={ event => handleUpdateNote(event, state.noteId) }
                                                                className="write-note-inner__wrapper"
                                                            >
                                                                <input type="text" name="note"
                                                                       value={ note }
                                                                       onChange={ (event => handleInputChange(event)) }
                                                                       className="form-control note__input"
                                                                       placeholder="Write note here."
                                                                />
                                                                <RiSendPlaneFill
                                                                    type="submit"
                                                                    onClick={ event => handleUpdateNote(event, state.noteId) }
                                                                    className="send-note__FAB"
                                                                />
                                                            </form>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*==== Modal Component ====*/}
                            <LeadModalComp />
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

export default LeadDetailsComp;
