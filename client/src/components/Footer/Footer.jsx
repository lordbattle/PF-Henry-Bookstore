import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="py-4 bg-dark">
        <div className="d-flex m-0  justify-content-around text-align align-items-center">
          <p className="m-0">
            <Link to={"/home"} className="text-white text-decoration-none">Home</Link>
          </p>
          <p className="m-0">
            <p>Made with 🧡</p>
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
