import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./Components/Home/home";
import Login from "./Components/Authentication/Login/login";

function App() {
  console.log("name", process.env.REACT_APP_name);
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/admin/login" component={Login}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
