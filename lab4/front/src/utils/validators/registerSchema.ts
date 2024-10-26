import { object, string } from "yup";

export const registerSchema = object({
    username: string().required("Required"),
    email: string().email("Invalid email address").required("Required"),
    password: string().min(8, "Min length is 8").required("Required"),
});
