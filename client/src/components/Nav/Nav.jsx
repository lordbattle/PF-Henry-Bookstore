import Stack from "react-bootstrap/Stack";

import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Nav = () => {
  return (
    <div
      className="px-2 py-3 border-0 bg_navbar text-white bg-dark"
    >
      <Stack direction="horizontal" gap={3}>
        <span className="p-2 link-as-text">
          <Link to={"/"} className="text-decoration-none fs-4 text-reset">
          TheLiteraryCorner
          </Link>
        </span>

        <SearchBar />

        <div className="w-100 m-0 d-flex justify-content-end">
          {" "}
          <span className="p-2 ms-0 link-as-text">
            <Link to={"/home"} className="text-decoration-none fs-5 text-reset">
              Home
            </Link>
          </span>
          <span className="p-2 ms-0 link-as-text">
            <Link
              to={"/about"}
              className="text-decoration-none fs-5 text-reset"
            >
              About Us
            </Link>
          </span>
          <span className="p-2 ms-0 link-as-text">
            <Link
              to={"/createbook"}
              className="text-decoration-none fs-5 text-reset"
            >
              Create Books
            </Link>
          </span>
        </div>

        <b className="vr" />

        <div className="w-25 d-flex justify-content-center gap-3">
          <Link to={"/login"} className="text-decoration-none  fs-5 text-reset">
            Log in
          </Link>

          <Link
            to={"/login"}
            className="text-decoration-none fs-5 text-reset"
          >
            Sign up
          </Link>
        </div>
      </Stack>
    </div>
  );
};

export default Nav;
