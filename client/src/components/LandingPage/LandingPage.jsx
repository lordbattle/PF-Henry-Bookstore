import Stack from 'react-bootstrap/Stack'
import { Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const LandingPage = () => {
    
    return (
        <div >
    <Stack className="container text-black d-flex align-items-center" direction="vertical">
      <h1>BookStore</h1>
      <p>A great place to buy a good book.</p>

      <div className="d-flex justify-content-center">
        <Button variant="link">
          <Link to={"/home"} className="text-decoration-none text-reset">Our Books</Link>
        </Button>

        <Button variant="link" className="p-2 link-as-text">
          <Link to={"/login"} className="text-decoration-none text-reset">Log in | Register</Link>
        </Button>
       
      </div>
    </Stack>

        <Row>
        <Col xs={6}className="d-flex align-items-center">
          <img src="https://cdn3d.iconscout.com/3d/premium/thumb/book-2997214-2516252.png" alt="yellow book" />
        </Col>
        <Col xs={6} className="d-flex align-items-center" style={{padding: '0px 50px'}}>
          <h1>LIFE IS TOO SHORT TO READ A BAD BOOK</h1>
        </Col>
      </Row>

      <Row>
        <Col xs={3}>
          <Image src="https://static.vecteezy.com/system/resources/previews/015/736/213/original/3d-books-3d-rendering-illustration-free-png.png" alt="blue book" style={{ width: '100%', height: 'auto' }} />
        </Col>
        <Col xs={9} className="d-flex align-items-center" style={{padding: '0px'}}>
          <h3>Discover the perfect place to buy your books right here! We offer one of the best websites with a wide variety of authors, categories, and the latest releases in the market. Immerse yourself in a world of knowledge and enjoy the experience of finding your next read all in one place!</h3>
        </Col>
      </Row>

      </div>
    )
}

export default LandingPage