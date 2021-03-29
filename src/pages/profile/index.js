import "./style.css";
import { observer } from "mobx-react";
import { useHistory, useParams } from "react-router";
import { useStore } from "../../store/store";
import profile from "../../images/profile.png";
import trash from "../../images/trash.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
  const {
    user,
    signOut,
    profileData,
    loadProfileData,
    loadOlderProfileData,
    deletePet,
  } = useStore();
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    loadProfileData(id);

    const handleScroll = (e) => {
      const target = e.target.scrollingElement;
      if (target.scrollHeight - target.scrollTop === target.clientHeight) {
        loadOlderProfileData(id);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadProfileData, loadOlderProfileData, id]);

  return (
    <>
      {user && user.uid === id && (
        <div className="user-panel">
          <img
            src={profile}
            alt=""
            style={{ width: 50, height: 50, float: "left" }}
          />
          <span
            style={{
              float: "left",
              fontSize: 20,
              marginTop: 12,
              marginLeft: 10,
            }}
          >
            Hello, {user.email}
          </span>
          <button className="auth-btn" onClick={signOut}>
            Sign Out
          </button>
          <button className="auth-btn" onClick={() => push("/add")}>
            Add Pet
          </button>
        </div>
      )}

      <div className="parent-profile-wrap">
        <div className="container">
          {profileData.map((pet, i) => {
            const { id, description, phone, breed } = pet;
            const { image, name, owner, location } = pet;
            return (
              <div key={id} className="card">
                <div className="face face1">
                  <div className="content">
                    <div className="icon">
                      <img
                        src={image}
                        className="fa fa-linkedin-square"
                        aria-hidden="true"
                        alt=""
                      />
                      {user && user.uid === owner && (
                        <img
                          style={{
                            zIndex: 2,
                            position: "absolute",
                            width: 40,
                            height: 40,
                            bottom: 4,
                            right: 4,
                            cursor: "pointer",
                          }}
                          src={trash}
                          alt=""
                          title="Delete"
                          onClick={() => deletePet(id)}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="face face2">
                  <div className="content">
                    <h3>{name}</h3>
                    <h4>{breed}</h4>
                    <p>
                      <b>{location}</b>
                    </p>
                    <p>
                      <b>{phone}</b>
                    </p>
                    <br />
                    <p>{description}</p>
                    <h3>
                      <Link to={`/profile/${owner}`}>Check owner posts</Link>
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default observer(Profile);
