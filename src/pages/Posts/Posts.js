import { observer } from "mobx-react";
import { useState } from "react";
import { Redirect, useHistory } from "react-router";
import { useStore } from "../../store/store";
import "./style.css";

const Posts = () => {
  const { user, addPet } = useStore();
  const { push } = useHistory();
  const [age, setAge] = useState(0);
  const [breed, setBreed] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (sending) {
      return;
    }

    if (!name) {
      setErrorMsg("Name is requied");
      return;
    }

    if (!breed) {
      setErrorMsg("Breed is requied");
      return;
    }

    if (age < 0.1) {
      setErrorMsg("Age can not be negative number.");
      return;
    }

    if (!description) {
      setErrorMsg("Description is requied");
      return;
    }

    if (!location) {
      setErrorMsg("Location is requied");
      return;
    }

    if (!phone) {
      setErrorMsg("Phone is requied");
      return;
    }

    if (!image) {
      setErrorMsg("Image URL is requied");
      return;
    }

    if (!image.startsWith("http") || !image.startsWith("https")) {
      setErrorMsg("Image URL is invalid");
      return;
    }

    setSending(true);
    addPet({ name, description, age, phone, location, image, breed })
      .then((docRef) => {
        push("/");
      })
      .catch(({ message }) => {
        setErrorMsg(message);
        setSending(false);
      });
  };

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="add-page">
      <div className="form">
        <form className="add-form" onSubmit={submit}>
          <input
            value={name}
            onChange={({ target: { value } }) => {
              setName(value);
              setErrorMsg("");
            }}
            type="text"
            placeholder="name"
          />
          <input
            value={breed}
            onChange={({ target: { value } }) => {
              setBreed(value);
              setErrorMsg("");
            }}
            type="text"
            placeholder="breed"
          />
          <input
            value={age}
            onChange={({ target: { value } }) => {
              setAge(value);
              setErrorMsg("");
            }}
            type="number"
            step={1}
            placeholder="age"
          />
          <input
            value={description}
            onChange={({ target: { value } }) => {
              setDescription(value);
              setErrorMsg("");
            }}
            type="text"
            placeholder="description"
          />
          <input
            value={location}
            onChange={({ target: { value } }) => {
              setLocation(value);
              setErrorMsg("");
            }}
            type="text"
            placeholder="location"
          />
          <input
            value={phone}
            onChange={({ target: { value } }) => {
              setPhone(value);
              setErrorMsg("");
            }}
            type="text"
            placeholder="phone"
          />
          <input
            value={image}
            onChange={({ target: { value } }) => {
              setImage(value);
              setErrorMsg("");
            }}
            type="text"
            placeholder="image URL"
          />
          {errorMsg && <div className="auth-form-error">{errorMsg}</div>}
          <button>add</button>
        </form>
      </div>
    </div>
  );
};

export default observer(Posts);
