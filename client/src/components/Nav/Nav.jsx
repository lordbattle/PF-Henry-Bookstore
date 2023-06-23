import { Link } from "react-router-dom";

const Nav = () => {
  return (
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

export default Nav;
