import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  //signInWithRedirect,
} from "firebase/auth";
import { auth } from "../../firebase.config";

export const AuthContextFirebase = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  // const signUp = (email, password) =>
  // createUserWithEmailAndPassword(auth,email,password)
  const signUp = async (email, password, displayName) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // acutaliza el display name
    await updateProfile(user, {
      displayName: displayName,
    });

    return user;
  };

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => {
    signOut(auth)};

   
  //Login Google
  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
    //return signInWithRedirect(auth, googleProvider)
  };

  //User logs back in
  useEffect(() => {
    // console.log("ya cargo")
    onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser)
      setUser(currentUser);
    });
  }, []);

  return (
    <AuthContextFirebase.Provider
      value={{ signUp, login, user, logout, loginWithGoogle }}
    >
      {children}
    </AuthContextFirebase.Provider>
  );
}

export const UserAuth = () => {
  const context = useContext(AuthContextFirebase);
  return context;
};
