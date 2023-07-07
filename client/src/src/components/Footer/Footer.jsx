import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="py-4 mt-3 fixed-bottom position-relative" style={{backgroundColor: '#71a5e5'}}>
        <div className="position-relative d-flex justify-content-around  m-0 text-center align-items-start">
          <div>
            <p className="text-white fs-4 text-reset">TheLiteraryCorner</p>
          </div>
          <div className="m-0 d-flex flex-column">
            <Link to={"/home"} className="text-white fs-5 text-decoration-none">
              Home
            </Link>
            <Link to={"/login"} className="text-white-50 text-decoration-none">
              Login
            </Link>
          </div>
          <div className="m-0">
            <p className="m-0 fs-5">Further Information</p>
            <p className="m-0 text-white-50">Privacy Policy</p>
            <p className="m-0 text-white-50">Terms & Conditions</p>
          </div>

          <div className="m-0">
            <p className="m-0 text-white fs-5">Company</p>
            <Link to={"/about"} className="text-white-50 text-decoration-none">
              About Us
            </Link>
            <p className="m-0 text-white-50">Contact us</p>
          </div>
          <div className="text-center">
            <p className="m-0 text-white-50 text-center">
              Copyright © 2023. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
