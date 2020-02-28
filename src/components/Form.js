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
        <div className="form">
            <Form>
                <label htmlFor="name">
                    Name:
                    <Field
                        id="name"
                        type="text"
                        name="name"
                        placeholder="name"
                        />
                        {/* touched is if input has been visited, errors are captured from Yup validation. 
                        If has been visited && errors exist for that input => render JSX to show errors */}
                        {touched.name && errors.name && (
                        <p className="errors">{errors.name}</p>
                        )}
                </label>
                <label htmlFor="email">
                    Email:
                    <Field
                        id="email"
                        type="email"
                        name="email"
                        placeholder="email"
                        />
                         {touched.email && errors.email && (
                        <p className="errors">{errors.email}</p>
                        )}
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
            {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
            {formInfo.map(info => {
                return (
                    <h3>{info.name}</h3>
                );
            })}
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
        console.log(values.name, " is username")
        axios
            .post("https://reqres.in/api/users", values)
            .then(res => {
                console.log("success", res);
                setStatus(res.data);
                resetForm();
            })
            .catch(err => console.log(err.response));
    }
})(FormComponent);

export default FormikFormComponent;