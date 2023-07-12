import Starts from "../Starts/Starts";

const ReviewStore = ({ rating, numberOfStars, comment }) => {
  return (
    <div>
      <Starts rating={rating} numberOfStars={numberOfStars} />
      <p style={{fontSize: '20px', paddingLeft: '7px'}}>{comment}</p>
    </div>
  );
};

export default ReviewStore;
