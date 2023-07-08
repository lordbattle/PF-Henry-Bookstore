import { useEffect, useState } from "react";
//import { Link } from "react-router-dom";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";

import { logingUser, postUsers } from "../../redux/actions/index";

import { useDispatch } from "react-redux";
import { UserAuth } from "../../context/AuthContextFirebase";
import { element } from "prop-types";
import validations from "../../hooks/validations";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import style from "./Register.module.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { signUp, loginWithGoogle } = UserAuth();

  const [formSubmitted, setFormSubmitted] = useState(false);

  // FILTRO EL EMAIL QUE ME TRAE EL LOCALSTORAGE
  /*  const userEmail = JSON.parse(localStorage.getItem("userData"));
  const userFilEmail = userEmail.email; */

  /* useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated]);
 */
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
        }}
        validate={(values) => {
          return validations(values);
        }}
        onSubmit={async (values, { resetForm }) => {
          try {
            console.log("datos form", values);
            // redux
            values.age = parseInt(values.age);
            try {
              await postUsersAsync(values); // Esperar la resolución de la promesa
            } catch (error) {
              throw new Error(error);
            }
            await signUp(values.email, values.password, values.name);
            //setFormSubmitted(true);
            //setTimeout(() => setFormSubmitted(false), 2000);
            //dispatch(logingUser(values.email, values.password, values.userName));
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
        {({ errors }) => (
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

            <label>
              <Field
                placeholder=""
                type="text"
                className={style.input}
                id="password"
                name="password"
              />
              <span>password</span>
            </label>
            <ErrorMessage
              name="password"
              component={() => <div className="error">{errors.password}</div>}
            />

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
              component={() => <div className="error">{errors.location}</div>}
            />

            <p className={style.p}>Optional data for registration</p>
            <div className={style.containerNumberInfo}>
              <label>
                <Field
                  placeholder="+ 18"
                  type="text"
                  className={style.input}
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
                  className={style.input}
                  id="genres"
                  name="genres"
                >
                  <option value=""> </option>
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                </Field>

                <span>Genres</span>
              </label>
              <ErrorMessage
                name="genres"
                component={() => <div className="error">{errors.genres}</div>}
              />

              <label>
                <Field
                  placeholder=" +COD-xxx-xxx-xxxx"
                  type="text"
                  className={style.input}
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

            <button className={style.submit} type="submit">
              Register
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

export default Register;