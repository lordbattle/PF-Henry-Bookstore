import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
     <footer className="py-4 mt-3 bg-dark fixed-bottom position-relative">
        <div className="position-relative d-flex justify-content-around  m-0 text-center align-items-center">
          <p className="m-0">
            <Link to={"/home"} className="text-white text-decoration-none">Home</Link>
          </p>
          <p className="m-0">
            <p className="m-0">Made with 🧡</p>
          </p>
          <p className="m-0">
            <Link to={"/about"} className="text-white text-decoration-none">About Us</Link>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
