import { useState } from "react";
import axiosInstance from "../../api/axiosInstance.js";
import { useForm } from "react-hook-form";

const ChangePassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordChange = async () => {
    try {
      const response = await axiosInstance.put(
        "/profile/changePassword",
        { currentPassword, newPassword }
      );

      if (response.status === 200) {
        setSuccessMessage("Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setErrorMessage("");
      } else {
        setErrorMessage("Error changing password");
        setSuccessMessage("");
      }
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

























// import React, { useState, useEffect } from "react";

// import { getAuth } from "firebase/auth";
// import axios from "axios";

// const ChangePassword = () => {
//   const { user, getAccessTokenSilently } = getAuth();
//   const [password, setPassword] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [profile, setProfileInfo] = useState(null);

//   useEffect(() => {
//     // Obtener información del perfil del usuario al cargar el componente
//     const fetchProfileInfo = async () => {
//       try {
//         const accessToken = await getAccessTokenSilently();
//         const response = await axios.get("/profile/profile", {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });

//         setProfileInfo(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchProfileInfo();
//   }, [getAccessTokenSilently]);

//   const handlePasswordChange = async (e) => {
//     e.preventDefault();

//     try {
//       const accessToken = await getAccessTokenSilently();
//       const response = await axios.put(
//         "/editpassword/changePassword",
//         { password },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         setSuccessMessage("Password changed successfully");
//         setPassword("");
//         setErrorMessage("");
//       } else {
//         setErrorMessage("Error al cambiar la contraseña");
//         setSuccessMessage("");
//       }
//     } catch (error) {
//       console.error(error);
//       setErrorMessage("Failed to change password");
//       setSuccessMessage("");
//     }
//   };

//   return (
//     <div>
//            <h2>Change Your Password</h2>
//       <form onSubmit={handlePasswordChange}>
//          <label>
//            You can change here :             
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </label>
//         <button type="submit">Change my password</button>
//       </form>
//       {successMessage && <p>{successMessage}</p>}
//       {errorMessage && <p>{errorMessage}</p>}
//     </div>
//   );
// };

// export default ChangePassword;
