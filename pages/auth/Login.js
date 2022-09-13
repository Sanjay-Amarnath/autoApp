import { useState } from "react";
import {
  signInWithGoogle,
  logInWithEmailAndPassword,
  signInWithFacebook,
  signInWithGithub,
  registerWithEmailAndPassword,
  sendPasswordReset,
} from "../../firebase/authProvider";
import { auth } from "../../firebase/authProvider";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const initialState ={
    username:"",
    password:"",
    email:"",
  }

  const [formData, setFormData] = useState({});
  const [loginToggle, setLoginToggle] = useState(false);
  const [keyReset, setKeyReset] = useState(true);

  // Authntication
  const [user, loading, error] = useAuthState(auth);

  const router = useRouter();

  const changeHandle = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandle = () => {
    logInWithEmailAndPassword(formData.email, formData.password);
  };


  useEffect(() => {
    if (user !== null) {
      router.push("/user/Dashboard");
    } else {
      router.push("/");
    }
  }, [user]);

  const createHandle = () => {
    registerWithEmailAndPassword(
      formData.username,
      formData.email,
      formData.password
    );
    setFormData({});
    setLoginToggle(false);
  };

  const resetPassword = () => {
    sendPasswordReset(formData.email, setKeyReset);
    setFormData({})
  };

  return (
    <div class="wrapper">
      {loginToggle ? (
        <>
          <h1>Hello again!</h1>
          <p>Create Free Account!</p>
          <input
            type="text"
            name="username"
            onChange={changeHandle}
            placeholder="Create username"
            value={formData.username}
          />
          <input
            type="email"
            name="email"
            onChange={changeHandle}
            placeholder="Enter email"
            value={formData.email}
          />
          <input
            type="password"
            name="password"
            onChange={changeHandle}
            placeholder="Create Password"
            value={formData.password}
          />
          <button onClick={createHandle}>Create Account</button>
          <p class="or">----- or continue with -----</p>
          <div class="icons">
            <i
              class="fab fa-google"
              onClick={() => {
                signInWithGoogle();
              }}
            ></i>
            <i
              class="fab fa-github"
              onClick={() => {
                signInWithGithub();
              }}
            ></i>
            <i
              class="fab fa-facebook"
              onClick={() => {
                signInWithFacebook();
              }}
            ></i>
          </div>
          <div class="not-member" onClick={() => setLoginToggle(false)}>
            Already i have an? <a href={"javascript:void(0)"}>Account</a>
          </div>
        </>
      ) : (
        <>
          <h1>Hello Passanger!</h1>
          <p>
            Welcome back you've <br /> been missed!
          </p>
          <form>
          {keyReset ? <>
            <input
              type="email"
              name="email"
              onChange={changeHandle}
              placeholder={keyReset?"Email":"Enter your Registered Email"}
              value={formData.email}
            />
              <input
                type="password"
                name="password"
                onChange={changeHandle}
                placeholder="Password"
                value={formData.password}
              />
              </>:
              <input
              type="email"
              name="email"
              onChange={changeHandle}
              placeholder={keyReset?"Email":"Enter your Registered Email"}
              value={formData.email}
            />
            }

            <p class="recover not-member">
              {keyReset ? (
                <a
                  href={"javascript:void(0)"}
                  onClick={() => {
                    setKeyReset(false);
                    setFormData({});
                  }}
                >
                  Recover Password
                </a>
              ) : (
                <a
                  href={"javascript:void(0)"}
                  onClick={() => {
                    setKeyReset(true);
                    setFormData({});
                  }}
                >
                  Back
                </a>
              )}
            </p>
          </form>
          {keyReset ? (
            <button onClick={submitHandle}>Sign in</button>
          ) : (
            <button onClick={resetPassword}>Reset password</button>
          )}

          <p class="or">----- or continue with -----</p>
          <div class="icons">
            <i
              class="fab fa-google"
              onClick={() => {
                signInWithGoogle();
              }}
            ></i>
            <i
              class="fab fa-github"
              onClick={() => {
                signInWithGithub();
              }}
            ></i>
            <i
              class="fab fa-facebook"
              onClick={() => {
                signInWithFacebook();
              }}
            ></i>
          </div>

          <div
            class="not-member"
            onClick={() => {
              setLoginToggle(true);
              setFormData({});
            }}
          >
            Not a member? <a href={"javascript:void(0)"}>Register Now</a>
          </div>
        </>
      )}
    </div>
  );
}


