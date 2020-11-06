import {
  Avatar,
  Button,
  Grid,
  ListItemAvatar,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter, Route } from "react-router-dom";
import { DATA_CALL_CHARACTERS } from "../actions";
import { CharacterRedux } from "./Character.page";
import { contentData, sortArray } from "../utils";

export const Characters = ({ loading, dataCharacters, getCharacters }) => {
  useEffect(() => {
    if (!loading && !contentData(dataCharacters)) {
      getCharacters();
    }
  }, [loading, dataCharacters, getCharacters]);

  const [filteredData, setFilteredData] = useState(dataCharacters);

  const handleChangeSearch = (event) => {
    console.log("handleChangeSearch");
    const value = event.target.value.toLowerCase();

    setFilteredData(
      value !== ""
        ? sortArray(dataCharacters, "name").filter((character) =>
            character.name.toLowerCase().includes(value)
          )
        : sortArray(dataCharacters, "name")
    );
  };

  return (
    <>
      <Route path="/characters/:name" component={CharacterRedux}></Route>

      <form>
        <TextField
          id="characters-search"
          label="Search in characters"
          onChange={handleChangeSearch}
        />
      </form>

      <Grid>
        {filteredData.map((character) => (
          <Button
            key={character.char_id}
            component={Link}
            to={"/characters/" + character.name}
            style={{ margin: 20 }}
          >
            <ListItemAvatar>
              <Avatar src={character.img} />
            </ListItemAvatar>
            {character.name}
          </Button>
        ))}
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = (dispatch) => ({
  getCharacters: () => dispatch({ type: DATA_CALL_CHARACTERS }),
});

export const CharactersRoute = withRouter(Characters);

export const CharactersRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(CharactersRoute);
