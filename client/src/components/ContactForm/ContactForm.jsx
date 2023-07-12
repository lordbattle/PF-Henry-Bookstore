import { useState } from "react";
//import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { contactAdm } from "../../redux/actions/index";
import { useDispatch } from "react-redux";
import validationsContactForm from "../../hooks/validationsContactForm";
import Swal from "sweetalert2";
import style from "./ContactForm.module.css";

const ContactForm = () => {
  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <div className={style.formContainer}>
      <Formik
        initialValues={{
          name: "",
          email: "",
          affair: "",
          message: "",
        }}
        validate={(values) => {
          return validationsContactForm(values);
        }}
        onSubmit={async (values, { resetForm }) => {
          try {
            setFormSubmitted(true);
            try {
              dispatch(contactAdm(values));
            } catch (error) {
              throw new Error(error);
            }
            setTimeout(() => setFormSubmitted(false), 4000);

            Swal.fire({
              icon: "success",
              title: "Form Submitted Successfully!",
              text: "Thank you for contacting us. We will get back to you soon.",
              backdrop: true,
            });
            resetForm();
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "An error occurred while submitting the form. Please try again later.",
            });
          }
        }}
      >
        {({ errors }) => (
          <Form className={style.form}>
            <p className={style.title}>Contact Form</p>
            <p className={style.message}>Send us an email</p>

            <label>
              <Field
                placeholder=""
                type="text"
                className={style.inputNames}
                id="name"
                name="name"
              />
              <span>Name</span>
            </label>
            <ErrorMessage
              name="name"
              component={() => <div className="errors">{errors.name}</div>}
            />

            <label>
              <Field
                id="email"
                name="email"
                type="text"
                className={style.input}
              />
              <span>Email</span>
            </label>
            <ErrorMessage
              name="email"
              component={() => <div className="error">{errors.email}</div>}
            />

            <label>
              <Field
                placeholder=""
                type="text"
                className={style.input}
                id="affair"
                name="affair"
              />
              <span>Affair</span>
            </label>
            <ErrorMessage
              name="affair"
              component={() => <div className="error">{errors.affair}</div>}
            />

            <label>
              <Field
                required=""
                placeholder=""
                type="text"
                className={style.input}
                id="message"
                name="message"
              />
              <span>Message</span>
            </label>
            <ErrorMessage
              name="message"
              component={() => <div className="error">{errors.message}</div>}
            />

            <button className={style.submit} type="submit">
              Send form contact
            </button>

            {formSubmitted && (
              <p className="exito"> Form submitted successfully</p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
