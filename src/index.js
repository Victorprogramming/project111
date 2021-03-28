import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store, StoreContext } from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
