import { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import { Formik } from "formik";
import { logingUser, postUsers } from "../../redux/actions";
import { useDispatch } from "react-redux";
//import { useNavigate } from "react-router-dom";
import style from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth;
  const [formSubmitted, setFormSubmitted] = useState(false);
  //const navigate = useNavigate();

  // FILTRO EL EMAIL QUE ME TRAE EL LOCALSTORAGE
 /*  const userEmail = JSON.parse(localStorage.getItem("userData"));
  const userFilEmail = userEmail.email; */

  /* useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated]);
 */
  return (
    <div className={style.formContainer}>
      <Formik
        initialValues={{
          userName: "",
          password: "",
          dni: "",
          name: "",
          lastName: "",
          //email: userFilEmail,
          email: "",
          age: "",
          location: "",
          genres: "",
          phone: "",
        }}
        validate={(values) => {
          let errors = {};
          if (!values.name) {
            errors.name = "Please, insert a name";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,20}$/.test(values.name)) {
            errors.name =
              "The name can only have letters and spaces and length less than 20";
          }
          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          try {
            resetForm();
            console.log("FORM SENT");
            //redux
            const user = dispatch(postUsers(values));
            //const user = signup(values);
            localStorage.setItem("userData", JSON.stringify(user.data));
            setFormSubmitted(true);
            setTimeout(() => setFormSubmitted(false), 5000);
            dispatch(
              logingUser(values.email, values.password, values.userName)
            );
            //navigate("/home");
            //window.location.href = "https://pf-henry-bookstore.vercel.app/home";
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({
          values,
          errors,
          handleSubmit,
          touched,
          handleChange,
          handleBlur,
        }) => (
          <form className={style.form} onSubmit={handleSubmit}>
            <p className={style.title}>Register</p>
            <p className={style.message}>
              Signup now and get full access to our app.
            </p>

            <label>
              <input
                required=""
                //value={userFilEmail}
                //readOnly
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span>Email</span>
            </label>

            <label>
              <input
                placeholder=""
                type="text"
                className={style.input}
                id="userName"
                name="userName"
                value={values.userName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span>User name</span>
            </label>

            <label>
              <input
                placeholder=""
                type="text"
                className={style.input}
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span>password</span>
            </label>

            <label>
              <input
                placeholder=""
                type="text"
                className={style.input}
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span>Name</span>
            </label>
            {touched.name && errors.name && (
              <div className={style.error}>{errors.name}</div>
            )}

            <label>
              <input
                placeholder=""
                type="text"
                className={style.input}
                id="lastName"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span>Last name</span>
            </label>
            {touched.lastName && errors.lastName && (
              <div className={style.error}>{errors.lastName}</div>
            )}

            <label>
              <input
                placeholder=""
                type="text"
                className={style.input}
                id="age"
                name="age"
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span>Age</span>
            </label>

            <label>
              <input
                required=""
                placeholder=""
                type="text"
                className={style.input}
                id="location"
                name="location"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span>Location</span>
            </label>

            <label>
              <input
                required=""
                placeholder=""
                type="text"
                className={style.input}
                id="genres"
                name="genres"
                value={values.genres}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span>Genres</span>
            </label>

            <label>
              <input
                required=""
                placeholder=""
                type="text"
                className={style.input}
                id="phone"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span>Phone</span>
            </label>

            <button className={style.submit}>Submit</button>
            {formSubmitted && (
              <p className={style.successMessage}>
                {formSubmitted && (
                  <p className={style.submit}> Form submitted successfully</p>
                )}
              </p>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
