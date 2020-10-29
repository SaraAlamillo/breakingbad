import React from "react";
import "./App.css";
import { ContainerRedux } from "./components/Container/Container.component";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Deaths } from "./pages/Deaths.pages";
import { Seasons } from "./pages/Seasons.pages";
import { Characters } from "./pages/Characters.pages";
import { Provider } from "react-redux";
import { createStore } from "./store";

function App() {
  return (
    <Provider store={createStore()}>
      <Router>
        <ContainerRedux
          menuItems={[
            { id: 1, name: "Seasons", route: "/seasons" },
            { id: 2, name: "Characters", route: "/characters" },
            { id: 3, name: "Deaths", route: "/deaths" },
          ]}
        >
          <Switch>
            <Route path="/seasons">
              <Seasons></Seasons>
            </Route>

            <Route path="/characters">
              <Characters></Characters>
            </Route>

            <Route path="/deaths">
              <Deaths></Deaths>
            </Route>
          </Switch>
        </ContainerRedux>
      </Router>
    </Provider>
  );
}

export default App;
