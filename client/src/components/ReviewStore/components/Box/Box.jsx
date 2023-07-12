import Starts from "../Starts/Starts";

const ReviewStore = ({ rating, numberOfStars, comment }) => {
  return (
    <div>
      <Starts rating={rating} numberOfStars={numberOfStars} />
      <input type="text" name="comment" placeholder="comment" defaultValue={comment} />
    </div>
  );
};

export default ReviewStore;
