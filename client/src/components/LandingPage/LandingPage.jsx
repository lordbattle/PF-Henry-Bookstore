import style from "../LandingPage/LandingPage.module.css";
import { Link } from "react-router-dom";
import CarouselComp from "../Carousel/Carousel.jsx";
import { useEffect } from "react";
import { logingUser, postUsers } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { UserAuth } from "../../context/AuthContextFirebase";
import logo5 from "../../images/logo5.png";
import Swal from "sweetalert2";

const LandingPage = () => {
  const userlogin = useSelector((state) => state.user);

  const { user, logout } = UserAuth();
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const loginUser = async () => {
        try {
          await new Promise((resolve) => {
            setTimeout(() => {
              resolve(dispatch(postUsers(user)));
            }, 3000);
          });
          try {
            await new Promise((resolve) => {
              resolve(dispatch(logingUser(user)));
            });
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: `Usuario bloqueado: ${user.displayName}`,
              text: "Estás bloqueado",
            });
            logout();
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: `...Ops`,
            text: "Ocurrio un error",
          });
          logout();
        }
      };

      loginUser();
    }
  }, [user, dispatch]);

  let userDataLocalPersistent =
    JSON.parse(localStorage.getItem("userDataLoginPersistent")) || null;

  console.log(
    "antes del efect que es userDataLocalPersistent   ",
    userDataLocalPersistent
  );

  useEffect(() => {
    localStorage.setItem("userDataLogin", JSON.stringify(userlogin));
    dispatch(logingUser(userDataLocalPersistent));
    if (userDataLocalPersistent && userDataLocalPersistent.length < 1) {
      localStorage.setItem(
        "userDataLoginPersistent",
        JSON.stringify(userlogin)
      );
    }
  }, [userlogin]);

  return (
    <main className={style.main}>
      <CarouselComp />

      <section className={style.contain_Register}>
        {" "}
        <article className={style.containLogo}>
          {" "}
          <img src={logo5} width={"auto"} height={"150px"}></img>
          <p>A great place to buy a good book.</p>
        </article>
        <article className={style.btns}>
          <Link to={"/home"} className={style.btn}>
            Our Books
          </Link>
          <p className="m-0 text-white">-o-</p>
          <Link to={"/optionLoginOrRegister"} className={style.btn}>
            Log in | Register
          </Link>
        </article>
      </section>
    </main>
  );
};

export default LandingPage;
