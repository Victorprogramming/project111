import "./style.css";
import { observer } from "mobx-react";
import { useStore } from "../../store/store";
import { Link, Redirect } from "react-router-dom";
import { useState } from "react";

const SignIn = () => {
  const store = useStore();
  const { user, signIn } = store;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (sending) {
      return;
    }

    setSending(true);
    const { error } = await signIn(email, password);
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
          {errorMsg && <div className="auth-form-error">{errorMsg}</div>}
          <button>sign in</button>
          <p className="message">
            Not a member? <Link to="/sign-up">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default observer(SignIn);
