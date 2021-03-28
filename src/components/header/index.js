import "./style.css";
import { observer } from "mobx-react";
import { useStore } from "../../store/store";
import { Link, useLocation, useParams } from "react-router-dom";

const Header = () => {
  const store = useStore();
  const { user } = store;
  const { pathname } = useLocation();
  const { userId } = useParams();
  return (
    <>
      <Link to="/" className={`tablink ${pathname === "/" ? "active" : ""}`}>
        Home
      </Link>
      <Link
        to="/search"
        className={`tablink ${pathname === "/search" ? "active" : ""}`}
      >
        Search
      </Link>
      {user ? (
        <Link
          to={`/profile/${user.uid}`}
          className={`tablink ${
            pathname === "/profile" && userId === user.uid ? "active" : ""
          }`}
        >
          {user.email}
        </Link>
      ) : (
        <Link
          to="/sign-up"
          className={`tablink ${
            ["/sign-up", "/sign-in"].includes(pathname) ? "active" : ""
          }`}
        >
          Sign Up
        </Link>
      )}
    </>
  );
};

export default observer(Header);
