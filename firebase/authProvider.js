import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  FacebookAuthProvider,
  GithubAuthProvider,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  onSnapshot,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getApp, initializeApp } from "firebase/app";
import firebase from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import { getAlluserinfo, getUserProfileinfo } from "../redux/activitySlice";
import { getStorage, ref } from "firebase/storage";

// FireBase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const firebaseApp = getApp(app);
// export const storage = getStorage(firebaseApp, "gs://my-custom-bucket");

// Create a storage reference from our storage service
// const storageRef = ref(storage);

// require

// Google Provider
const googleProvider = new GoogleAuthProvider();

// FaceBook Provider
const facebookProvider = new FacebookAuthProvider();

// github Provider
const githubProvider = new GithubAuthProvider();

//  SignUpWithGithub

export const signInWithGithub = async () => {
  try {
    const res = signInWithPopup(auth, githubProvider);
    const credential = FacebookAuthProvider.credentialFromResult(res);
    const accessToken = credential.accessToken;
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);

    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (e) {
    console.error(e);
  }
};

//signUpwith Facebook

export const signInWithFacebook = async () => {
  const res = signInWithPopup(auth, facebookProvider);
  const user = res.user.user;
  const credential = FacebookAuthProvider.credentialFromResult(result);
  const accessToken = credential.accessToken;

  const q = query(collection(db, "users"), where("uid", "==", user.uid));
  const docs = await getDocs(q);

  if (docs.docs.length === 0) {
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: user.displayName,
      authProvider: "google",
      email: user.email,
    });
  }
};

// Sign-In With Google
export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);

    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        profile: user.photoURL,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

//register Email and Password

export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
      name
    );
    const user = res.user;

    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "email",
        email: user.email,
        profile: user.photoURL,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

//send Password Reset
export const sendPasswordReset = async (email, setKeyReset) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
    setKeyReset(true);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Logout
export const logout = () => {
  signOut(auth);
};

// Update Profile
export const updateUserProfile = async (name, uploadImg, setIsLoading, id) => {
  const photo = uploadImg === "" ? auth?.currentUser?.photoURL : uploadImg;

  const userName = name ?? auth?.currentUser?.displayName;

  const taskDocRef = doc(db, "users", id);

  try {
    const res = updateProfile(auth.currentUser, {
      displayName: userName,
      photoURL: photo,
    });

    await updateDoc(taskDocRef, {
      name: userName,
      profile: photo,
    });

    if (res) {
      alert("Profile Updated");
      setIsLoading(false);
    }
  } catch (err) {}
};

// get current user information
export const getFirebaseAuth = () => (dispatch) => {
  dispatch(getUserProfileinfo(auth.currentUser));
};

// Get Other users information
export const getAllFirebaseUserInfo = () => (dispatch) => {
  // dispatch(getAlluserinfo())
  const q = query(collection(db, "users"));
  onSnapshot(q, (querySnapshot) => {
    dispatch(getAlluserinfo(querySnapshot.docs));
  });
};
