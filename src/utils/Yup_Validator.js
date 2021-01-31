import * as yup from 'yup'; // for everything

export const staffLogin = yup.object().shape({
    staff_email: yup.string().email("Email must be a valid email.").required("Email is required."),
    staff_password: yup.string().required("Password is required.").min(6, "Password must be at least 6 characters."),
});
