import { useState } from "react";
//import { Link } from "react-router-dom";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { postUsers } from "../../redux/actions";
import { useDispatch } from "react-redux";
//import { useNavigate } from "react-router-dom";
import style from "./Register.module.css";
import { element } from "prop-types";
import validations from "../../hooks/validations";

const Register = () => {
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  //const navigate = useNavigate();

  // FILTRO EL EMAIL QUE ME TRAE EL LOCALSTORAGE
  /* const userEmail = JSON.parse(localStorage.getItem("userData"));
  const userFilEmail = userEmail.email; */

  const agesSelect = () => {
    let count = [];
    for (let i = 18; i <= 100; i++) {
      count.push(i + '');
    }
    return count;
  }

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
          profilePic: '',

          dni: "",
          name: "",
          lastName: ""
        }}
        validate={ (values) =>{
          return validations(values);
        }
        }
        onSubmit={(values, { resetForm }) => {
          resetForm();
          console.log("FORM SENT");
          const user = dispatch(postUsers(values));
          localStorage.setItem("userData", JSON.stringify(user.data));
          setFormSubmitted(true);
          setTimeout(() => setFormSubmitted(false), 5000);
          //window.location.href = "https://pf-henry-bookstore.vercel.app/home";
        }}
      >
        {({
          errors, handleSubmit , handleChange , handleBlur
        }) => (
          <form className={style.form} onSubmit={handleSubmit} >
            <p className={style.title}>Register</p>
            <p className={style.message}>
              Signup now and get full access to our app.
            </p>
            <div className={style.containerNames}>
              <div>
                <label>
                  <Field
                    placeholder=''
                    type="text"
                    className={style.inputNames}
                    id="name"
                    name="name"
                  />
                  <span>Name</span>
                </label>
                <ErrorMessage name='name' component={() =>
                (<div className='errors'>{errors.name}</div>
                )} />
                {/*errors.name && <div className="error">{errors.name} </div>*/ }
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
                <ErrorMessage name='lastName' component={() =>
                (<div className='errors'>{errors.lastName}</div>
                )} />
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
            <ErrorMessage name='email' component={() => (<div className='error'>{errors.email}</div>)} />


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
            <ErrorMessage name='userName' component={() => (<div className='error'>{errors.userName}</div>)} />

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
            <ErrorMessage name='password' component={() => (<div className='error'>{errors.password}</div>)} />

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
            <ErrorMessage name='location' component={() => (<div className='error'>{errors.location}</div>)} />


            <div className={style.containerNumberInfo}>
              <label>
                <Field
                  placeholder='+ 18'
                  type='text'
                  className={style.input}
                  id="age"
                  name="age"
                />
                <span>Age</span>
              </label>
              <ErrorMessage name='age' component={() => (<div className='error'>{errors.age}</div>)} />



              <label>
                <Field
                  as='select'
                  className={style.input}
                  id="genres"
                  name="genres"
                >
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </Field>

                <span>Genres</span>
              </label>
              <ErrorMessage name='genres' component={() => (<div className='error'>{errors.email}</div>)} />


              <label>
                <Field
                  placeholder=" +COD xxx-xxx-xxxx"
                  type="text"
                  className={style.input}
                  id="phone"
                  name="phone"
                />
                <span>Phone</span>
              </label>
              <ErrorMessage name='phone' component={() => (<div className='error'>{errors.phone}</div>)} />

            </div>





            <button className={style.submit}>Register</button>
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
