import style from "../LandingPage/LandingPage.module.css";
import { Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CarouselComp from "../Carousel/Carousel.jsx";
import { useEffect } from "react";
import { logingUser, postUsers } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { UserAuth } from "../../context/AuthContextFirebase";
import logo5 from '../../images/logo5.png'

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

  console.log("Landing USER AQUI  ", user);

  console.log("Landing userlogin AQUI  ", userlogin);


  return (
    <div className={style.main}>
      <div className={style.head}>
        <img src={logo5} width={'700px'} height={'150px'}></img>
        <p style={{ fontSize: "20px" }}>A great place to buy a good book.</p>
        <div className={style.btns}>
          <Button className={style.containerbtn}>
            <Link to={"/home"} className={style.btn}>
              Our Books
            </Link>
          </Button>

          <Button className={style.containerbtn}>
            <Link to={"/optionLoginOrRegister"} className={style.btn}>
              Log in | Register
            </Link>
          </Button>
        </div>
      </div>
      <Row>
        <CarouselComp />
        <Col
          xs={5}
          className="d-flex align-items-center"
          style={{ padding: "5px 120px" }}
        >
          <img
            src="https://images.vexels.com/media/users/3/151119/isolated/preview/0916a384c03a97e17954c40d0cb6d73b-hombre-leyendo-libro-silueta-gente-leyendo.png"
            alt="yellow book"
          />
        </Col>
        <Col
          xs={6}
          className="d-flex flex-wrap align-items-center"
          style={{ padding: "100px 0px" }}
        >
          <h1>LIFE IS TOO SHORT TO READ A BAD BOOK</h1>
          <h2>"Unleash Your Imagination, One Page at a Time"</h2>
        </Col>
      </Row>

      <Row>
        <Col xs={3} style={{ padding: "20px 0px 30px" }}>
          <Image
            src="https://images.vexels.com/media/users/3/151287/isolated/preview/90111e412b99189ef799b3d7a697097d-mujer-leyendo-libro-silueta-gente-leyendo.png"
            alt="stackbook"
            style={{ width: "100%", height: "auto", padding: "20px 40px" }}
          />
        </Col>
        <Col
          xs={8}
          className="d-flex align-items-center"
          style={{ padding: "40px" }}
        >
          <h3>
            "Discover a world of literary wonders at our online bookshop. From
            captivating novels to insightful non-fiction, our carefully curated
            collection offers something for every reader. Immerse yourself in
            the pages that hold stories waiting to be explored, characters
            waiting to be discovered, and ideas waiting to be pondered. Find
            your next great read and let the magic of books transport you to new
            realms of imagination and knowledge. Happy reading!"
          </h3>
        </Col>
      </Row>
    </div>
  );
};

export default LandingPage;
