import StartRatings from "react-star-ratings";

const Starts = (props) => {
  return (
    <StartRatings
      {...props}
      starRatedColor="rgb(109, 122, 130)"
      starEmptyColor="rgb(203, 211, 227)"
      starHoverColor="rgb(230, 67, 47)"
      starDimension="50px"
      starSpacing="7px"
    />
  );
};

export default Starts;
