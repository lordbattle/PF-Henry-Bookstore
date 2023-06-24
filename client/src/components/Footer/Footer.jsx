import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="py-4 bg-dark fixed-bottom">
        <div className="d-flex m-0  justify-content-around text-align align-items-center">
          <p className="m-0">
            <Link className="text-white text-decoration-none">Home</Link>
          </p>
          <p className="m-0">
            <Link to={"/about"} className="text-white text-decoration-none">About Us</Link>
          </p >
          <p className="m-0">
            <Link className="text-white text-decoration-none">Services</Link>
          </p>
          <p className="m-0">
            <Link className="text-white text-decoration-none">Team</Link>
          </p>
          <p className="m-0 text-white">Contact</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
