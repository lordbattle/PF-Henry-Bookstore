import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Starts from "../Starts/Starts";

const Form = ({
  formValues,
  setFormValues,
  numberOfStars,
  HandleSubmitted,
  bookId,
  userId,
  orderItemId,
}) => {
  const handleChange = ({ target: { name, value } }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const changeRating = (rating) => {
    setFormValues({ ...formValues, rating });
  };

  const handleSubmit = async (event) => {
    Swal.fire(
      'Published review',
      '',
      'success'
    )
    event.preventDefault();

    const {
      data: { success },
    } = await axios.post("http://localhost:3001/reviewStore", {
      comment: formValues.comment,
      score: formValues.rating,
      bookId,
      userId,
      orderItemId,
    });

    if (success) HandleSubmitted();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Starts
        rating={formValues.rating}
        numberOfStars={numberOfStars}
        changeRating={changeRating}
      />
      <input
        name="comment"
        type="text"
        placeholder="comment"
        value={formValues.comment}
        onChange={handleChange}
      />
      <button>Send</button>
    </form>
  );
};

export default Form;
