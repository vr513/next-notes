import { useAuth } from "../contexts/AuthContext";
import react, { useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function login() {
  const email = useRef();
  const pass = useRef();
  const { Login } = useAuth();
  const nav = useRouter();
  const [loading, setLoading] = useState();
  const [btnText, setBtnText] = useState("Login");
  async function handleLoginSubmit(e) {
    e.preventDefault();
    console.log("In login submit")
    setBtnText("Logging you in");
    try {
      setLoading(true);
      const usr = await Login(email.current.value, pass.current.value);
      console.log(usr);
      nav.push("/dashboard")
      setLoading(false);
    } catch (c) {
      console.log(c);
      setLoading(false);
    }
    setBtnText("Login");
  }
  return (
    <>
      <div className="container">
        <form className="mt-5 p-5">
          <h2 className="text-center mb-3">Login</h2>
          <div className="form-outline mb-4">
            <input
              type="email"
              id="form2Example1"
              className="form-control"
              ref={email}
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
              ref={pass}
            />
            <label className="form-label" htmlFor="form2Example2">
              Password
            </label>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-block mb-4"
            disabled={loading}
            onClick={handleLoginSubmit}
          >
            {btnText}
          </button>

          <div className="text-center">
            <p>
              Not a member? <Link href="/signup">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
