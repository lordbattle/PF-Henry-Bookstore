/* import { useAuth0 } from '@auth0/auth0-react' */
/* import Register from '../Register/Register'; */
import style from "../Login/Login.module.css";

import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { UserAuth } from "../../context/AuthContextFirebase";
import { logingUser, logoutUser } from "../../redux/actions";
import Swal from "sweetalert2";
import { useEffect} from "react";

import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { user, loginWithGoogle } = UserAuth();
  console.log(user, "aqui");


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userlogin = useSelector((state) => state.user);
  // const [loggedIn, setLoggedIn] = useState(false);
 /*    const nombre = useSelector((state) => state.user);
  const { user } = UserAuth();  */

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      Swal.fire({
        icon: "success",
        title: `Welcome ${user.displayName}`,
        text: "Login with Google successful",
      });
      console.log(user);

      navigate("/home");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (userlogin) {
      console.log(userlogin.userName);
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
    if (userlogin && userlogin.error === "Invalid user") {
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
    }
  }, [userlogin]);

  /* const handleRegister = () => {
    setOptionRegister(true);
    setOptionLogin(false);

  }
  const handleLogin = () => {
    setOptionLogin(true);
    setOptionRegister(false);
  } */

  return (
    <div className={style.ContainerMain}>
      <div>
        <span>Welcome to The Literary Corner</span>
      </div>
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
        onSubmit={async (values, { resetForm }) => {
          console.log(values, "ver aca");
          try {
            dispatch(logingUser(values));
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
          resetForm();
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
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label htmlFor="name" className="text-lg text-current">
                Email
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
                type="text"
                id="email"
                name="email"
                placeholder="  Wil@email.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur} //validar fuera del input
              />
              {touched.email && errors.email && (
                <span className=" bg-red text-red-700">{errors.email}</span>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="name" className="text-lg text-current">
                Password
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
                type="password"
                id="password"
                name="password"
                placeholder=" **********"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password && (
                <span className=" bg-red text-red-700">{errors.password}</span>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-y-4">
              <button
                type="submit"
                className="active:scale-[0.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold"
              >
                Sing in
              </button>
              <button
                onClick={handleGoogle}
                type="button"
                className="active:scale-[0.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all flex rounded-xl py-3 border-2 border-gray-100 items-center justify-center gap-2 "
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
                  Sing in with Google
                </button>
                <Link
                  to="/home"
                  className="flex mt-8 justify-between text-violet-500 text-lg font-medium no-underline hover:underline"
                >
                  return home
                </Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
