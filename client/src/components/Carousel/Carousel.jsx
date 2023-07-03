import Carousel from 'react-bootstrap/Carousel';


const CarouselComp = () => {
    return (
        <Carousel>
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100" height={'350vh'}
              src=""
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100"
              src=""
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100"
              src=""
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100"
              src=""
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src=""
              alt="First slide"
            />
          </Carousel.Item>
        </Carousel>
      );
}

export default CarouselComp