import { useAuth } from "../contexts/AuthContext";
import react, { useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [btnText, setBtnText] = useState("Sign Up");
  const nav = useRouter();
  async function handleSignUpSubmit(e) {
    e.preventDefault();
    setBtnText("Signing you up");
    setError("");
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError("Passwords dont match");
    }
    setLoading(true);
    if (error === "") {
      try {
        console.log("in try");
        setLoading(true);
        const usr = await signup(
          emailRef.current.value,
          passwordRef.current.value
        );
        console.log(usr);
        nav.push("/dashboard");
      } catch (c) {
        setError("Failed to create an account");
      }
    }
    setLoading(false);
    setBtnText("Sign Up");
  }
  return (
    <>
      <div className="container">
        <form className="mt-5 p-5">
          <h2 className="text-center mb-3">Signup</h2>
          <div className="form-outline mb-4">
            <input
              type="email"
              id="form2Example1"
              className="form-control"
              ref={emailRef}
            />
            <label className="form-label" htmlFor="form2Example1">
              Email address
            </label>
          </div>

          <div className="form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              className="form-control"
              ref={passwordRef}
            />
            <label className="form-label" htmlFor="htmlForm2Example2">
              Password
            </label>
          </div>
          <div className="form-outline mb-4">
            <input
              type="password"
              id="form2Example3"
              className="form-control"
              ref={passwordConfirmRef}
            />
            <label className="form-label" htmlFor="form2Example3">
              Confirm Password
            </label>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-block mb-4"
            disabled={loading}
            onClick={handleSignUpSubmit}
          >
            {btnText}
          </button>

          <div className="text-center">
            <p>
              Already a member? <Link href="/login">Sign in</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
