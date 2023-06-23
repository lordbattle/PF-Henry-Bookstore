import Stack from 'react-bootstrap/Stack'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <div className="container border border-primary rounded bg-success text-white">
        <Stack direction="horizontal" gap={3}>

        <span className="p-2 link-as-text">
          <Link to={"/"} className="text-decoration-none text-reset">NameStore</Link>
        </span>

        <span className="p-2 ms-auto link-as-text">
          <Link to={"/home"} className="text-decoration-none text-reset">Products</Link>
        </span>
        
        <b className="vr" />

        <span className="p-2 link-as-text">
          <Link to={"/login"} className="text-decoration-none text-reset">Log in</Link>
        </span>

        <span className="p-2 link-as-text">
          <Link to={"/register"} className="text-decoration-none text-reset">Sign up</Link>
        </span>
        
        </Stack>
        
      </div>
    )
}

export default Nav