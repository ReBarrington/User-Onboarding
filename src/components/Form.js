import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const FormComponent = ({ values, errors, touched, status }) => {
    const [formInfo, setFormInfo] = useState([]);
    useEffect(() => {
        console.log("status has changed!", status);
        status && setFormInfo(formInfo => [...formInfo, status]);
    }, [status]);
    return (
        <div classname="form">
            <Form>
                <label htmlFor="name">
                    Name:
                    <Field
                        id="name"
                        type="text"
                        name="name"
                        placeholder="name"
                        />
                </label>
                <label htmlFor="email">
                    Email:
                    <Field
                        id="email"
                        type="email"
                        name="email"
                        placeholder="email"
                        />
                </label>
                <label htmlFor="password">
                    Password:
                    <Field
                        id="password"
                        type="password"
                        name="password"
                        placeholder="password"
                        />
                </label>
                <label className="checkbox-container">
                    Terms of Service:
                    <Field
                        type="checkbox"
                        name="terms"
                        checked={values.terms}
                        />
                    <span className="checkmark" />
                </label>
                <button type="submit">Submit!</button>
            </Form>
        </div>
    )
}

const FormikFormComponent = withFormik({
    mapPropsToValues(props) {
        return {
            name: props.name || "",
            email: props.email || "",
            password: props.password || "",
            terms: props.terms || "",

        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("NAME IS REQUIRED")
    }),
    handleSubmit(values, { setStatus, resetForm }) {
        console.log("submitting", values);
        axios
            .post("https://reqres.in/api/users/", values)
            .then(res => {
                console.log("success", res);
                setStatus(res.data);
                resetForm();
            })
            .catch(err => console.log(err.response));
    }
})(FormComponent);

export default FormikFormComponent;