import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import validationsForgotPassword from "../../hooks/validationsForgotPassword";
import { forgotPasswordChange } from "../../redux/actions/index";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import style from "../ForgotPassword/ForgotPassword.module.css";

const Forgotpassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <div className={style.formContainer}>
      <Formik
        initialValues={{
          email: "",
          securityQuestion: "",
        }}
        validate={(values) => {
          return validationsForgotPassword(values);
        }}
        onSubmit={async (values, { resetForm }) => {
          console.log("estoy en onsubmit");
          console.log("Que es values  ", values);
          try {
              setFormSubmitted(true);
            try {
              await dispatch(forgotPasswordChange(values)); // Esperar la resolución de la promesa
            } catch (error) {
              throw new Error(error);
            }
            setTimeout(() => setFormSubmitted(false), 3000);
            Swal.fire({
              icon: "success",
              title: "Password changed!",
              text: "The new password was sent to your registered email!",
              backdrop: true,
            });
            navigate("/login");
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Missing data",
              text: `${error}`,
            });
          }
        }}
      >
        {({ errors }) => (
          <Form className={style.form}>
            <p className={style.title}>Recover password</p>
            <p className={style.message}>
              Enter the data to recover your password.
            </p>

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
                required=""
                placeholder="What is the name of your favorite pet?"
                type="text"
                className={style.input}
                id="securityQuestion"
                name="securityQuestion"
              />
              <span>Security question</span>
            </label>
            <ErrorMessage
              name="securityQuestion"
              component={() => (
                <div className="error">{errors.securityQuestion}</div>
              )}
            />

            <button className={style.submit} type="submit">
              Submit password recovery form
            </button>

            {formSubmitted && (
              <p>
                {formSubmitted && (
                  <p className="exito"> Form submitted successfully</p>
                )}
              </p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Forgotpassword;
