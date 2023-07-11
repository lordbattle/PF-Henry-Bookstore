import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/actions";
import Swal from "sweetalert2";

const ForgotPasswordForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleForgotPasswordSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Email:", email);
      await dispatch(forgotPassword(email));
      setEmail("");
      onClose();
      Swal.fire({
        icon: "success",
        title: `Email sent for password request`,
        text: "You will receive an email if it is registered in our database",
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Form onSubmit={handleForgotPasswordSubmit}>
      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button type="submit" variant="primary">
        Submit
      </Button>
    </Form>
  );
};

export default ForgotPasswordForm;
