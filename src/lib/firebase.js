// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  confirmPasswordReset,
  applyActionCode,
} from "firebase/auth";

import { signOut as NextAuthSignOut } from "next-auth/react";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  orderBy,
  addDoc,
  query,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKgO4xoXJSdlTLlMO6Y-MPNkJzcW47nQA",
  authDomain: "tumor-scan.firebaseapp.com",
  projectId: "tumor-scan",
  storageBucket: "tumor-scan.appspot.com",
  messagingSenderId: "243785654758",
  appId: "1:243785654758:web:605a1291041e80289b3627",
  measurementId: "G-D2HB8EG5GN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const database = getFirestore();
export const auth = getAuth();

// export const signWithGoogle = () => signInWithRedirect(auth, provider);
export const signWithGoogle = () => signInWithPopup(auth, provider);
// console.log()
export const signInWithGoogleRedirect = () => {
  signInWithRedirect(auth, provider);
};

export const addComment = async (comment) => {
  try {
    const commentsCollectionRef = collection(database, "comments");
    await addDoc(commentsCollectionRef, comment);
    // toast.success("Comment added successfully!");
  } catch (error) {
    console.error("Error adding comment:", error);
  }
};

export const deleteComment = async (commentId) => {
  try {
    const commentDocRef = doc(database, "comments", commentId);
    await deleteDoc(commentDocRef);
    // toast.success("Comment deleted successfully!");
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};

export const getComments = async () => {
  try {
    const commentsCollectionRef = collection(database, "comments");
    const q = query(commentsCollectionRef, orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return []; // Return an empty array if no documents are found
    }

    const commentsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return commentsData;
  } catch (error) {
    console.error("Error getting comments:", error);
    throw error;
  }
};

export const addUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Send email verification
    await sendEmailVerificationToUser(userCredential.user);

    return userCredential.user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

// Creating user document and if it doesn't exist create new one

export const createUserDocument = async (user, additionalInfo = {}) => {
  if (!user) return;
  const userDocRef = doc(database, "users", user.uid);
  const userSnapShoot = await getDoc(userDocRef);
  if (!userSnapShoot.exists()) {
    const { email } = user;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (err) {
      console.error(err);
    }
  }
  return userDocRef;
};

export const sendEmailVerificationToUser = async (user) => {
  if (!user) return;

  try {
    await sendEmailVerification(user);

    //  toast.success("Email verification sent successfully.");
  } catch (error) {
    console.error("Error sending email verification:", error);
    toast.error("Error sending email verification: ", error.code);
    throw error;
    return;
  }
};

export const sendPasswordResetEmailToUser = async (email) => {
  if (!email) return;

  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("Password reset email sent successfully.");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    toast.error("Error sending password reset email: ", error.code);
    throw error;
    return;
  }
};

export const resetPassword = async (oobCode, password) => {
  if (!password || !oobCode) return;

  try {
    await confirmPasswordReset(auth, oobCode, password);
    toast.success("Password has been reset successfully.");
  } catch (error) {
    console.error("Error resetting password :", error);
    toast.error("Error resetting password : ", error.code);
    throw error;
    return;
  }
};

export const verifyEmail = async (oobCode) => {
  if (!oobCode) return;

  try {
    await applyActionCode(auth, oobCode);
    toast.success("Email has been verified.");
  } catch (error) {
    console.error("Error verifying email :", error);
    toast.error("Error verifying email : ", error.code);
    throw error;
    return;
  }
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const SignOutUser = async () => {
  if (window.confirm("Are You sure you wanna sign out?") === true) {
    await NextAuthSignOut();
    await signOut(auth);
  } else {
    return;
  }
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
