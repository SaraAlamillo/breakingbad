import React from "react";
import { ContainerThemable } from "./components/Container/Container.component";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { DeathsRedux } from "./pages/Deaths.page";
import { SeasonsRedux } from "./pages/Seasons.page";
import { CharactersRedux } from "./pages/Characters.page";
import { Provider } from "react-redux";
import { createStore } from "./store";
import { ThemeSelector } from "./components/ThemeSelector/ThemeSelector.component";
import { EpisodeRedux } from "./pages/Episode.page";

function App() {
  return (
    <Provider store={createStore()}>
      <ThemeSelector>
        <Router>
          <ContainerThemable
            menuItems={[
              { id: 1, name: "Seasons", route: "/seasons" },
              { id: 2, name: "Characters", route: "/characters" },
              { id: 3, name: "Deaths", route: "/deaths" },
            ]}
          >
            <Switch>
              <Route path="/seasons">
                <SeasonsRedux></SeasonsRedux>
              </Route>

              <Route path="/characters">
                <CharactersRedux></CharactersRedux>
              </Route>

              <Route path="/deaths">
                <DeathsRedux></DeathsRedux>
              </Route>

              <Route path="/episode/:id">
                <EpisodeRedux></EpisodeRedux>
              </Route>
            </Switch>
          </ContainerThemable>
        </Router>
      </ThemeSelector>
    </Provider>
  );
}

export default App;
