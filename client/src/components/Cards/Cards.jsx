import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import style from "../Cards/Cards.module.css";
import { useDispatch } from "react-redux";
import { incrementItemCart } from "../../redux/actions";

const Cards = (props) => {
  const dispatch = useDispatch();

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
    dispatch(incrementItemCart());
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
            <span>author's: {props.author}</span>
          </section>
          <section className="d-flex w-100 align-items-start justify-content-center gap-5">
            <div className="w-50 d-flex flex-column pl-5">
              {" "}
              <p className="m-0 fs-3 text-start">
                ${props.price}
                
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
              fontSize: '20px'
            }}
          >
            Read more
          </Link>
          <span
            onClick={handlerCart}
            className={style.read}
            style={{
              display: "flex",
              margin: "1vh",
              justifyContent: "center",
              fontSize: '20px'
            }}
          >
            Add to cart
          </span>
        </div>
      </main>
    );
  }
};

export default Cards;
