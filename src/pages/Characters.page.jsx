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
import { charactersStyle } from "./Characters.style";

export const Characters = ({ characters, getCharacters }) => {
  const styleClasses = charactersStyle();

  useEffect(() => {
    if (!characters.loading && !contentData(characters.data)) {
      getCharacters();
    }
  }, [characters, getCharacters]);

  const [filteredData, setFilteredData] = useState(characters.data);

  const handleChangeSearch = (event) => {
    const value = event.target.value.toLowerCase();

    setFilteredData(
      value !== ""
        ? sortArray(characters.data, "name").filter((character) =>
            character.name.toLowerCase().includes(value)
          )
        : sortArray(characters.data, "name")
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
            className={styleClasses.button}
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
