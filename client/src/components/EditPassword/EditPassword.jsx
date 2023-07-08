import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { changePassword } from "../../redux/actions/index";

const ChangePassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const dispatch = useDispatch();

  const handlePasswordChange = async () => {
    try {
      await dispatch(changePassword(currentPassword, newPassword));

      setSuccessMessage("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to change password");
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <h2>Change Your Password</h2>
      <form onSubmit={handleSubmit(handlePasswordChange)}>
        <label>
          Current Password:
          <input
            type="password"
            {...register("currentPassword", { required: true })}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </label>
        {errors.currentPassword && <p>Current Password is required</p>}
        <label>
          New Password:
          <input
            type="password"
            {...register("newPassword", { required: true })}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        {errors.newPassword && <p>New Password is required</p>}
        <label>
          Confirm Password:
          <input
            type="password"
            {...register("confirmPassword", {
              required: true,
              validate: (value) => value === newPassword || "Passwords do not match"
            })}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        <button type="submit">Change password</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default ChangePassword;
