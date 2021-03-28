import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import Profile from "./pages/profile";

const App = () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/profile/:id" component={Profile} />
    </Switch>
  </Router>
);

export default App;
