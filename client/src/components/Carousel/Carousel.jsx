import Carousel from 'react-bootstrap/Carousel';
import carousel1 from '../../images/carru_1.jpg';
import carousel2 from '../../images/carrusell_2.jpg';
import carousel3 from '../../images/carrusell_3.jpg';

const CarouselComp = () => {
    return (
        <Carousel>
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100" height={'250vh'}
              src={carousel1}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100" height={'250vh'}
              src={carousel2}
              alt="Second slide"
            />
          </Carousel.Item>

          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100" height={'250vh'}
              src={carousel3}
              alt="Third slide"
            />
          </Carousel.Item>

          {/* /////////////////DESCOMENTAR SI SE VAN A USAR ///////////////////*/}
          {/* <Carousel.Item interval={3000}>
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
          </Carousel.Item> */}
        </Carousel>
      );
}

export default CarouselComp