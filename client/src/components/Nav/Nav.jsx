<<<<<<< HEAD
=======
import Stack from "react-bootstrap/Stack";

>>>>>>> develop
import { Link } from "react-router-dom";

const Nav = () => {
  return (
<<<<<<< HEAD
    <nav className="navbar navbar-expand-md w-100 navbar-light bg-light">
      <div className="container-fluid d-flex align-items-center">
        <h2 className="navbar-brand m-0" >
          Navbar
        </h2>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-around" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" aria-current="page" to={"/home"}>
              Home
            </Link>
            <Link className="nav-link" href="#">
              Categories
            </Link>
            <Link className="nav-link" href="#">
              Offers
            </Link>
            <Link className="nav-link" to={"/about"}>
              About Us
            </Link>
          </div>
          <div>
            <Link className="btn btn-primary" to={"/login"}>
              Log In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

=======
    <div style={{backgroundColor: "#ffafcc"}} className="px-2 py-3 border-0 rounded bg_navbar text-white">
      <Stack direction="horizontal" gap={3}>
        <span className="p-2 link-as-text">
          <Link to={"/"} className="text-decoration-none fs-4 text-reset">
            NameStore
          </Link>
        </span>

        <div className="w-100 m-0 d-flex justify-content-end">
          {" "}
          <span className="p-2 ms-0 link-as-text">
            <Link to={"/home"} className="text-decoration-none fs-5 text-reset">
              Home
            </Link>
          </span>
          <span className="p-2 ms-0 link-as-text">
            <Link to={"#"} className="text-decoration-none fs-5 text-reset">
              Categories
            </Link>
          </span>
          <span className="p-2 ms-0 link-as-text">
            <Link to={"/about"} className="text-decoration-none fs-5 text-reset">
              About Us
            </Link>
          </span>
        </div>

        <b className="vr" />

        <div className="w-25 d-flex justify-content-center gap-3">
          <Link to={"/login"} className="text-decoration-none  fs-5 text-reset">
            Log in
          </Link>

          <Link to={"/register"} className="text-decoration-none fs-5 text-reset">
            Sign up
          </Link>
        </div>
      </Stack>
    </div>
  );
};

>>>>>>> develop
export default Nav;
