import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import Profile from "./pages/profile";
import Posts from "./pages/Posts/Posts";

const App = () => (
  <Router>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/profile/:id" component={Profile} />
      <Route path="/add" component={Posts} />
    </Switch>
  </Router>
);

export default App;
