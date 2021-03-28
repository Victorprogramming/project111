import { observer } from "mobx-react";
import { useParams } from "react-router";
import { useStore } from "../../store/store";
import "./style.css";

const Profile = () => {
  const { user, signOut } = useStore();
  const { id } = useParams();

  return (
    <>
      {user && user.uid === id && (
        <div className="logout">
          <button onClick={signOut}>Sign Out</button>
        </div>
      )}
    </>
  );
};

export default observer(Profile);
