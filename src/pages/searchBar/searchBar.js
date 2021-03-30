import "./style.css";
import { observer } from "mobx-react";
import { useStore } from "../../store/store";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Search = () => {
  const store = useStore();

  const [breed, setBreed] = useState(store?.lastSearch?.breed || "");
  const [age, setAge] = useState(store?.lastSearch?.age || 0);

  useEffect(() => {
    const handleScroll = (e) => {
      const target = e.target.scrollingElement;
      if (target.scrollHeight - target.scrollTop === target.clientHeight) {
        store.loadOlderSearch();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [store]);

  const search = () => {
    if (!age || !breed) {
      return;
    }

    store.search(breed, age);
  };

  return (
    <>
      <div className="search-panel">
        <input
          className="search-input"
          name="breed"
          placeholder="breed"
          type="text"
          value={breed}
          onChange={({ target: { value } }) => setBreed(value)}
        />
        <input
          className="search-input"
          name="breed"
          placeholder="age"
          type="number"
          step="1"
          value={age}
          onChange={({ target: { value } }) => setAge(value)}
        />
        <button className="search-btn" onClick={search}>
          Search
        </button>
      </div>
      <div className="parent-search-wrap">
        <div className="container">
          {store.searchData.map((pet, i) => {
            const { id, description, phone, breed } = pet;
            const { image, name, owner, location, age } = pet;
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
                    <h4>Age: {age}</h4>
                    <h4>Breed: {breed}</h4>
                    <p>
                      Location: <b>{location}</b>
                    </p>
                    <p>
                      Phone: <b>{phone}</b>
                    </p>
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

export default observer(Search);
