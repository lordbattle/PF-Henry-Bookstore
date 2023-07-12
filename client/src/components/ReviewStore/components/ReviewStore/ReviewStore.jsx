import { useState } from "react";

import Box from "../Box/Box";
import Form from "../Form/Form";

const initialState = {
  rating: 5,
  comment: "",
};

const ReviewStore = ({ reviewStore, bookId, userId, orderItemId }) => {
  const [formValues, setFormValues] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const HandleSubmitted = () => {
    setSubmitted(true);
  };

  return (
    <>
      {reviewStore || submitted ? (
        submitted ? (
          <Box
            rating={formValues.rating}
            numberOfStars={5}
            comment={formValues.comment}
          />
        ) : (
          <Box
            rating={reviewStore.score}
            numberOfStars={5}
            comment={reviewStore.comment}
          />
        )
      ) : (
        <Form
          formValues={formValues}
          setFormValues={setFormValues}
          numberOfStars={5}
          HandleSubmitted={HandleSubmitted}
          bookId={bookId}
          userId={userId}
          orderItemId={orderItemId}
        />
      )}
    </>
  );
};

export default ReviewStore;
