import * as yup from 'yup'; // for everything

export const staffLogin = yup.object().shape({
    staff_email: yup.string().email("Email must be a valid email.").required("Email is required."),
    staff_password: yup.string().required("Password is required.").min(6, "Password must be at least 6 characters."),
});

export const leadValidation = yup.object().shape({
    leads_name: yup.string().required("Lead name is required."),
    leads_phone: yup.string().required("Lead phone number is required."),
    leads_email: yup.string().email("Email must be a valid email."),
    leads_address: yup.string(),
    leads_state: yup.string().required("Lead name is required."),
    purpose: yup.string()
});
