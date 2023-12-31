import useStorage from "../LocalStorage/LocalStorage";
import { buyBook } from "../../redux/actions";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Swal from "sweetalert2";
import style from "../Cart/Cart.module.css";
import "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { incrementItemCart, decrementItemCart } from "../../redux/actions";

export const Cart = () => {
  const dispatch = useDispatch();
  // const user = useSelector(state => state.user)
  const totalItemCart = useSelector((state) => state.totalItemSCart);

  let userDataLocalPersistent =
    JSON.parse(localStorage.getItem("userDataLoginPersistent")) || null;

  let idUser = 0;

  /* if (user) {
    idUser = user.id
  } */

  if (userDataLocalPersistent) {
    idUser = userDataLocalPersistent.id;
  }
  console.log("ESTO ES results", idUser);

  const { cart, setCart } = useStorage();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  const handleIncreseAmount = (itemId) => {
    const updateCart = cart.map((item) => {
      if (item.id === itemId) {
        dispatch(incrementItemCart());
        if (item.stock < 10) {
          return {
            ...item,
            stock: item.stock + 1,
          };
        }
      }
      return item;
    });
    setCart(updateCart);
  };

  const handleDecreaseAmount = (itemId) => {
    const updateCart = cart.map((item) => {
      if (item.id === itemId) {
        dispatch(decrementItemCart(1));
        if (item.stock === 1) {
          return item;
        }
        return {
          ...item,
          stock: item.stock - 1,
        };
      }
      return item;
    });
    setCart(updateCart);
  };

  const handleRemoveItem = (itemId) => {
    const itemRemove = cart.filter((item) => item.id === itemId);
    dispatch(decrementItemCart(itemRemove[0].stock));
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };
  ///////TOTAL TO PAY//////
  let totalCart = 0;
  cart.forEach((item) => {
    totalCart += item.price * item.stock;
  });

  ///mercadoPago
  const [Id, setId] = useState(null);
  const publicKey = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;
  initMercadoPago(publicKey);

  let loadingAlert;
  const handleBuy = async () => {
    try {
      loadingAlert = Swal.fire({
        title: "Loading...",
        html: "Preparing your purchase, wait...",
        allowOutsideClick: false,
        showCancelButton: false,
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

      const items = cart.map((item) => ({
        id: item.id,
        quantity: item.stock,
      }));

      const product = {
        id_user: idUser,
        items: items,
      };

      const id = await buyBook(product)();
      if (id) {
        setId(id);
        loadingAlert.close();
      }
    } catch (error) {
      console.log(`error del catch buyproduch ${error}`);
    }
  };

  useEffect(() => {
    if (status === "approved") {
      setCart([]);
      Swal.fire({
        title: "Good job!",
        text: "Purchase successfully",
        icon: "success",
        confirmButtonText: "✔️",
        backdrop: "rgba(53, 222, 53, 0.6)",
      });
      dispatch(decrementItemCart(totalItemCart));
      console.log("ESTO ES LO QUE TIENE EL LOCALSTORAGEDATA si approved", cart);
    }
  }, [status]);
  if (status === "rejected") {
    Swal.fire({
      title: "Failed",
      text: "Failed purchase",
      icon: "error",
      confirmButtonText: "Retry",
      backdrop: "rgba(248, 40, 40, 0.8)",
    });
  } else if (status === "pending") {
    Swal.fire({
      title: "Pending",
      text: "Something went wrong",
      icon: "warning",
      confirmButtonText: "Retry",
      backdrop: "rgba(243, 148, 23, 0.8)",
    });
  }

  return (
    <div>
      {cart.length > 0 ? (
        <div>
          {cart.map((item) => (
            <div key={item.id} className={style.main}>
              <div style={{ display: "flex" }}>
                <img
                  src={item.img}
                  alt="book image"
                  style={{
                    height: "11rem",
                    width: "10rem",
                    marginRight: "1rem",
                  }}
                />
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <p>ID del producto: {item.id}</p>
                  <p>{item.title}</p>
                  <p>${item.price}</p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  minWidth: "20rem",
                  height: "2.5rem",
                  backgroundColor: "#71a5e5",
                  borderRadius: "8px",
                  paddingTop: "3px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {item.stock > 1 && (
                    <button
                      onClick={() => handleDecreaseAmount(item.id)}
                      className={style.decrease}
                    >
                      -
                    </button>
                  )}
                  <p
                    style={{
                      fontSize: "20px",
                      marginLeft: "5px",
                      marginRight: "5px",
                    }}
                  >
                    Amount: {item.stock}
                  </p>
                  <button
                    onClick={() => handleIncreseAmount(item.id)}
                    className={style.increase}
                  >
                    +
                  </button>
                </div>
                <span
                  className={style.delete}
                  onClick={() => handleRemoveItem(item.id)}
                >
                  ❌Delet product❌
                </span>
              </div>
            </div>
          ))}

          <span
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              minWidth: "100%",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "20px" }}>Total: ${totalCart}</p>
            <Link to="/home">
              <button className={style.btn}>Keep buying</button>
            </Link>
            <button onClick={handleBuy} className={style.btn}>
              Buy
            </button>
          </span>
          {Id && <Wallet initialization={{ preferenceId: Id }} />}
        </div>
      ) : (
        <div className={style.empty}>
          <img
            src="https://img.freepik.com/iconos-gratis/carrito-compras_318-820968.jpg"
            alt="empty"
            width={"20%"}
          ></img>
          <h3 style={{ width: "100%", paddingTop: "1em" }}>
            There are no items in the cart
          </h3>
          <Link to="/home" style={{ width: "100%", paddingTop: "1em" }}>
            <button className={style.btnAdd}>Add items</button>
          </Link>
        </div>
      )}
    </div>
  );
};
export default Cart;
