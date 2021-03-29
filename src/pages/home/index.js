import "./style.css";
import { observer } from "mobx-react";
import { useStore } from "../../store/store";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const store = useStore();

  useEffect(() => {
    store.loadHomeData();

    const handleScroll = (e) => {
      const target = e.target.scrollingElement;
      if (target.scrollHeight - target.scrollTop === target.clientHeight) {
        store.loadOlderHomeData();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [store]);

  return (
    <div className="parent-home-wrap">
      <div className="container">
        {store.homeData.map((pet, i) => {
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
  );
};

export default observer(Home);
