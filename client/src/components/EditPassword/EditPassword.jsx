import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePasswordUser } from "../../redux/actions/index";
import { Formik, Form, Field, ErrorMessage } from "formik";
import validationsChangePassword from "../../hooks/validationsChangePassword";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import style from "./EditPassword.module.css";

const EditPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const userLoginLocal = JSON.parse(localStorage.getItem("userDataLogin"));

  return (
    <div className={style.formContainer}>
      <Formik
        initialValues={{
          userId: userLoginLocal.id,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validate={(values) => {
          return validationsChangePassword(values);
        }}
        onSubmit={async (values, { resetForm }) => {
          console.log("estoy en onsubmit");
          console.log("Que es values  ", values);
          try {
            setFormSubmitted(true);
            setTimeout(() => setFormSubmitted(false), 5000);
            try {
              await dispatch(changePasswordUser(values)); // Esperar la resolución de la promesa
            } catch (error) {
              throw new Error(error);
            }
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
              text: `${error.message}`,
            });
          }
        }}
      >
        {({ errors }) => (
          <Form className={style.form}>
            <p className={style.title}>Change Your Password</p>
            <p className={style.message}>
              Enter the data to change your password.
            </p>

            <label style={{ display: "none" }}>
              <Field
                id="id"
                name="id"
                type="text"
                className={style.input}
                value={userLoginLocal.id}
                readOnly={true}
              />
              <span>User Name</span>
            </label>

            <label>
              <Field
                id="currentPassword"
                name="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                className={style.input}
              />
              <span>Current Password:</span>
              <button
                type="button"
                className={style.toggleButton}
                onClick={toggleCurrentPasswordVisibility}
              >
                {showCurrentPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </label>
            <ErrorMessage
              name="currentPassword"
              component={() => (
                <div className="error">{errors.currentPassword}</div>
              )}
            />

            <label>
              <Field
                required=""
                type={showNewPassword ? "text" : "password"}
                className={style.input}
                id="newPassword"
                name="newPassword"
              />
              <span>New Password:</span>
              <button
                type="button"
                className={style.toggleButton}
                onClick={toggleNewPasswordVisibility}
              >
                {showNewPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </label>
            <ErrorMessage
              name="newPassword"
              component={() => (
                <div className="error">{errors.newPassword}</div>
              )}
            />

            <label>
              <Field
                required=""
                type={showConfirmPassword ? "text" : "password"}
                className={style.input}
                id="confirmPassword"
                name="confirmPassword"
              />
              <span>Confirm Password:</span>
              <button
                type="button"
                className={style.toggleButton}
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </label>
            <ErrorMessage
              name="confirmPassword"
              component={() => (
                <div className="error">{errors.confirmPassword}</div>
              )}
            />

            <button className={style.submit} type="submit">
              Submit password change form
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

export default EditPassword;
