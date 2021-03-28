import "./style.css";
import { observer } from "mobx-react";
import { useStore } from "../../store/store";
import { Link, Redirect } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  const store = useStore();
  const { user, signUp } = store;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (sending) {
      return;
    }

    if (password !== rePassword) {
      setErrorMsg("Passwords don't match");
      return;
    }

    setSending(true);
    const { error } = await signUp(email, password);
    if (error) {
      setErrorMsg(error);
    }

    setSending(false);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form" onSubmit={submit}>
          <input
            value={email}
            onChange={({ target: { value } }) => {
              setEmail(value);
              setErrorMsg("");
            }}
            type="email"
            placeholder="email"
          />
          <input
            value={password}
            onChange={({ target: { value } }) => {
              setPassword(value);
              setErrorMsg("");
            }}
            type="password"
            placeholder="password"
          />
          <input
            value={rePassword}
            onChange={({ target: { value } }) => {
              setRePassword(value);
              setErrorMsg("");
            }}
            type="password"
            placeholder="password"
          />
          {errorMsg && <div className="auth-form-error">{errorMsg}</div>}
          <button>sign up</button>
          <p className="message">
            Already a member? <Link to="/sign-in">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default observer(SignUp);
