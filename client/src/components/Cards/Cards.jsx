import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import style from "../Cards/Cards.module.css";

const Cards = (props) => {
  const handlerCart = () => {
    const newItem = {
      id: props.id,
      img: props.imageLinks,
      title: props.title,
      price: props.price,
      stock: 1,
    };
    props.addToCart(newItem);

    Swal.fire({
      position: "bottom-end",
      title: "successfully added",
      showConfirmButton: false,
      backdrop: "transparent",
      color: "white",
      background: "rgb(102, 187, 106)",
      timer: 700,
      width: 300,
    });

    console.log("ENTREA NEW ITEM", newItem);
  };

  if (props.active === true) {
    return (
      <main className={style.main}>
        <div className={style.containImg}>
          <img
            src={props.imageLinks}
            alt={props.title}
            className={style.image}
          />
        </div>

        <div className={style.contain_title}>
          <section className="d-flex justify-content-start flex-column pl-5 w-100">
            <h3 className="m-0">{props.title}</h3>
            <span>name author {props.author}</span>
          </section>
          <section className="d-flex w-100 align-items-start justify-content-center gap-5">
            <div className="w-50 d-flex flex-column pl-5">
              {" "}
              <p className="m-0 fs-3 text-start">
                ${props.price}{" "}
                <span style={{ color: "#4cbd49" }} className="fs-6">
                  15% OFF
                </span>
              </p>
              <p className="m-0 text-start">
                en{" "}
                <span style={{ color: "#4cbd49" }}>
                  12 x ${Math.round(props.price / 12)}.00 sin intereses.
                </span>
              </p>
            </div>
            <div className="w-50">
              {" "}
              <p>Rating: {props.averageRating}</p>
            </div>
          </section>{" "}
        </div>

        <div className={style.contain_btns}>
          <Link
            to={`/detail/${props.id}`}
            style={{
              display: "flex",
              justifyContent: "center",
              textDecoration: "none",
              width: "auto",
            }}
          >
            Read more
          </Link>
          <span
            onClick={handlerCart}
            className={style.read}
            style={{
              display: "flex",
              marginTop: "1vh",
              justifyContent: "center",
            }}
          >
            Add to cart
          </span>
        </div>
      </main>
    );
  } else {
    return (
      <div
        className={style.main}
        style={{ marginLeft: "15px 20px", backgroundColor: "red" }}
      >
        <div className={style.container}>
          <img
            style={{
              maxWidth: "100%",
              maxHeight: "300vh",
              width: "250px",
              height: "250px",
            }}
            src={props.imageLinks}
            alt=""
            className={style.img}
          />
          <h3
            className={style.title}
            style={{
              minHeight: "40px",
            }}
          >
            {props.title}
          </h3>
          <p style={{ minHeight: "50px" }}>Authors: {props.authors}</p>
          <p style={{ minHeight: "55px" }}>Categories: {props.categories}</p>
          <p>Price: ${props.price}</p>
          <p>Stock: {props.stock}</p>
          <p>Rating: {props.averageRating}</p>
          <h4>DISABLED PRODUCT</h4>
          <Link
            to={`/detail/${props.id}`}
            style={{
              display: "flex",
              justifyContent: "center",
              textDecoration: "none",
              width: "auto",
            }}
          >
            <span
              className={style.read}
              style={{ display: "flex", justifyContent: "center" }}
            >
              Read more
            </span>
          </Link>
          {/* Agrega más propiedades aquí según tus necesidades */}
        </div>
      </div>
    );
  }
};

export default Cards;
