import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Login, Todo, Verify, PrivateRoute } from "./components/pages";
import { store } from "fluxible-js";

function App() {
  console.log("Store", store.user);
  return (
    <div className="App">
      {/* Create Route */}
      <Router>
        <Switch>
          <PrivateRoute auth={store.user} exact path="/todo">
            {/* Todo Page */}
            <Todo />
          </PrivateRoute>
          <Route exact path="/login">
            {/* Login Page */}
            <Login />
          </Route>
          <Route exact path="/verify">
            {/* Login Page */}
            <Verify />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
