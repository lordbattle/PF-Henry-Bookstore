import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { UserAuth } from "../../context/AuthContextFirebase";
import { logingUser, logoutUser } from "../../redux/actions";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import style from "../Login/Login.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ForgotPasswordForm from "../ForgotPassword/ForgotPasswordForm";

const Login = () => {
  const { user, loginWithGoogle } = UserAuth();
  console.log(user, "aqui");
  console.log("loginWithGoogle es   ", loginWithGoogle);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userlogin = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const handleForgotPassword = () => {
    setShowForgotPasswordModal(true);
  };

  const handleCloseModal = () => {
    setShowForgotPasswordModal(false);
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      Swal.fire({
        icon: "success",
        title: `Welcome to The LiteraryCorner`,
        //title: `Welcome ${user.displayName}`,
        text: "Login with Google successful",
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    //Google
    if (
      user &&
      user.displayName !== undefined &&
      userlogin.userName !== undefined
    ) {
      console.log("Usuario logeado " + user.displayName);
      console.log("Usuario logeado user " + user);
      Swal.fire({
        icon: "success",
        title: `Welcome ${user.displayName}`,
        text: "You are logged in!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/home");
        }
      });
    }

    //BD
    if (userlogin && userlogin.userName !== undefined) {
      console.log("Usuario logeado " + userlogin.userName);
      Swal.fire({
        icon: "success",
        title: `Welcome ${userlogin.userName}`,
        text: "You are logged in!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/home");
        }
      });
    }

    /* if (userlogin && userlogin.error === "Invalid user") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid email or password!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(logoutUser());
        }
      });
    }
    if (userlogin && userlogin.error === "User banned") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "User banned!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(logoutUser());
        }
      });
    } */
  }, [userlogin]);

  const logingUserAsync = (payload) => {
    return new Promise((resolve, reject) => {
      dispatch(logingUser(payload))
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return (
    <div className={style.ContainerMain}>
      <div className={style.ContainerForm}>
        <div style={{ marginTop: "1rem" }}>
          <span className={style.title}>Welcome to The Literary Corner</span>
        </div>
        <div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validate={(values) => {
              let error = {};
              if (!values.email) {
                error.email = "enter email";
              } else {
                if (
                  !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                    values.email
                  )
                ) {
                  error.email = "invalid email";
                }
              }
              if (!values.password) {
                error.password = "invalid password";
              }
              return error;
            }}
            onSubmit={async (values) => {
              try {
                await logingUserAsync(values);
                Swal.fire({
                  icon: "success",
                  title: `Welcome to The LiteraryCorner`,
                  text: "Login successful",
                });
                navigate("/");
              } catch (error) {
                console.log("Propiedad 'errorMessage':", error.message);

                if (error.message === "User banned") {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "User banned!",
                  });
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "User or password incorrect",
                  });
                }
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
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className={style.label}>
                    Email
                  </label>
                  <br />
                  <input
                    className={style.input}
                    type="text"
                    id="email"
                    name="email"
                    placeholder="  Wil@email.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur} //validar fuera del input
                  />
                  <br />
                  {touched.email && errors.email && (
                    <span style={{ color: "red" }}>{errors.email}</span>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="name" className={style.label}>
                    Password
                  </label>
                  <br />
                  <input
                    className={style.input}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder=""
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <br />
                  <button
                    type="button"
                    className={style.toggleButton}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                  <br />
                  {touched.password && errors.password && (
                    <span style={{ color: "red" }}>{errors.password}</span>
                  )}
                </div>

                <div className={style.options}>
                  <button type="submit" className={style.buttonSigIn}>
                    Sign in
                  </button>

                  <button
                    onClick={handleGoogle}
                    type="button"
                    className={style.buttonSigInGoogle}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z"
                        fill="#EA4335"
                      />
                      <path
                        d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z"
                        fill="#34A853"
                      />
                      <path
                        d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z"
                        fill="#4A90E2"
                      />
                      <path
                        d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z"
                        fill="#FBBC05"
                      />
                    </svg>
                    Sign in with Google
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
        <Link to="/home" className={style.back}>
          Return home
        </Link>

        <Button variant="primary" onClick={handleForgotPassword}>
          Forgot my password
        </Button>

        <Modal show={showForgotPasswordModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Forgot your password?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ForgotPasswordForm onClose={handleCloseModal} />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Login;
