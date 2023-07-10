import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { changePassword } from "../../redux/actions/index";
import styles from "./editPassword.module.css";

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
    <div className={styles.container}>
      <h2 className={styles.title}>Change Your Password</h2>
      <form onSubmit={handleSubmit(handlePasswordChange)}>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Current Password:</label>
          <input
            type="password"
            {...register("currentPassword", { required: true })}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={styles.inputField}
          />
          {errors.currentPassword && <p className={styles.error}>Current Password is required</p>}
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>New Password:</label>
          <input
            type="password"
            {...register("newPassword", { required: true })}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={styles.inputField}
          />
          {errors.newPassword && <p className={styles.error}>New Password is required</p>}
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Confirm Password:</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: true,
              validate: (value) => value === newPassword || "Passwords do not match"
            })}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.inputField}
          />
          {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit" className={styles.button}>Change password</button>
      </form>
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
};

export default ChangePassword;
