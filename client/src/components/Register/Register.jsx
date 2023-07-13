import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { postUsers, getUsers } from "../../redux/actions/index";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import style from "./Register.module.css";
import Loading from "../Loading/Loading";
import validations from "../../hooks/validations";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const postUsersAsync = (payload) => {
    console.log("postUserAync", payload);
    return new Promise((resolve, reject) => {
      dispatch(postUsers(payload))
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return (
    <div className={style.formContainer}>
      <Formik
        initialValues={{
          userName: "",
          password: "",
          email: "",
          age: "",
          location: "",
          genres: "",
          phone: "",
          name: "",
          lastName: "",
          securityQuestion: "",
        }}
        validate={(values) => {
          return validations(values);
        }}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            setSubmitting(true);
            setFormSubmitted(true);
            try {
              await postUsersAsync(values);
              dispatch(getUsers());
            } catch (error) {
              throw new Error(error);
            }
            setTimeout(() => {
              setSubmitting(false);
              setFormSubmitted(false);
            }, 3000);
            Swal.fire({
              icon: "success",
              title: "Registered Welcome!",
              text: "You are now part of The Litary Corner!",
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
        {({ errors, isSubmitting }) => (
          <Form className={style.form}>
            <p className={style.title}>Register</p>
            <p className={style.message}>
              Signup now and get full access to our app.
            </p>
            <div className={style.containerNames}>
              <div>
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
              </div>

              <div>
                <label>
                  <Field
                    id="lastName"
                    name="lastName"
                    placeholder=""
                    type="text"
                    className={style.inputNames}
                  />
                  <span>Last name</span>
                </label>
                <ErrorMessage
                  name="lastName"
                  component={() => (
                    <div className="errors">{errors.lastName}</div>
                  )}
                />
              </div>
            </div>

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
                id="userName"
                name="userName"
              />
              <span>User name</span>
            </label>
            <ErrorMessage
              name="userName"
              component={() => <div className="error">{errors.userName}</div>}
            />
            <div className={style.containerMainPassword}>
              <div className={style.containerPassword}>
                <label>
                  <Field
                    placeholder=""
                    type={showPassword ? "text" : "password"}
                    className={style.inputPassword}
                    id="password"
                    name="password"
                  />
                  <span>password</span>
                </label>
                <ErrorMessage
                  name="password"
                  component={() => (
                    <div className="error">{errors.password}</div>
                  )}
                />
              </div>
              <div>
                <button
                  type="button"
                  className={style.toggleButton}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            <label>
              <Field
                required=""
                placeholder=""
                type="text"
                className={style.input}
                id="location"
                name="location"
              />
              <span>Location</span>
            </label>
            <ErrorMessage
              name="location"
              component={() => (
                <div className="error">{errors.location}</div>
              )}
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

            <p className={style.p}>Optional data for registration</p>
            <div className={style.containerNumberInfo}>
              <label>
                <Field
                  placeholder="+ 18"
                  type="text"
                  className={style.inputOptional}
                  id="age"
                  name="age"
                />
                <span>Age</span>
              </label>
              <ErrorMessage
                name="age"
                component={() => <div className="error">{errors.age}</div>}
              />

              <label>
                <Field
                  as="select"
                  className={style.inputOptional}
                  id="genres"
                  name="genres"
                >
                  <option value="not specified"></option>
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                </Field>

                <span>Genres</span>
              </label>
              <ErrorMessage
                name="genres"
                component={() => (
                  <div className="error">{errors.genres}</div>
                )}
              />

              <label>
                <Field
                  placeholder=" +COD-xxx-xxx-xxxx"
                  type="text"
                  className={style.inputOptional}
                  id="phone"
                  name="phone"
                />
                <span>Phone</span>
              </label>
              <ErrorMessage
                name="phone"
                component={() => <div className="error">{errors.phone}</div>}
              />
            </div>

            <button className={style.submit} type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loading /> : "Register"}
            </button>

            {formSubmitted && (
              <p className="exito">Form submitted successfully</p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;

