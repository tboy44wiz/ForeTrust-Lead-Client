//  Base URL.
// const base_url = "https://foretrust-leads-record-api.herokuapp.com/api/v1";
const base_url = "http://localhost:5000/api/v1";

//  Auth routes.
export const user_registration_url = `${base_url}/auth/signup`;
export const staff_login_url = `${base_url}/staff/login`;
export const getSingleStaff_url = `${base_url}/staff/single_staff`;

// Leads routes.
export const createLeads_url = `${base_url}/lead/create_lead`;
export const getAllLeads_url = `${base_url}/lead/all_leads`;
export const getSingleLead_url = `${base_url}/lead/single_lead`;
export const updateSingleLead_url = `${base_url}/lead/update_lead`;
export const deleteSingleLead_url = `${base_url}/lead/delete_lead`;

//  Notes Route.
export const createNote_url = `${base_url}/note/create_note`;
export const updateNote_url = `${base_url}/note/update_note`;
export const deleteSingleNote_url = `${base_url}/note/delete_note`;
