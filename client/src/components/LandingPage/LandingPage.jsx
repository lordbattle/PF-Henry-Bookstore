import style from "../LandingPage/LandingPage.module.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CarouselComp from "../Carousel/Carousel.jsx";
import { useEffect } from "react";
import { logingUser, postUsers } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { UserAuth } from "../../context/AuthContextFirebase";
import logo5 from "../../images/logo5.png";

const LandingPage = () => {
  const userlogin = useSelector((state) => state.user);

  const { user } = UserAuth();
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        dispatch(postUsers(user));
      }, 3000);

      setTimeout(() => {
        dispatch(logingUser(user));
      }, 3000);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("userDataLogin", JSON.stringify(userlogin));
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
          <Link to={"/home"} className={style.btn}>Our Books</Link>
            <p className="m-0 text-white">-o-</p>
          <Link to={"/optionLoginOrRegister"} className={style.btn}>Log in | Register</Link>
        </article>
      </section>
    </main>
  );
};

export default LandingPage;
