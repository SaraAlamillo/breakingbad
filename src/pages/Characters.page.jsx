import {
  Avatar,
  Button,
  Grid,
  ListItemAvatar,
  TextField,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter, Route } from "react-router-dom";
import { DATA_CALL_CHARACTERS } from "../actions";
import { CharacterRedux } from "./Character.page";

export class Characters extends Component {
  static propTypes = {};

  static defaultProps = {};

  static mapStateToProps = (state) => ({ ...state });

  static mapDispatchToProps = (dispatch) => ({
    getCharacters: () => dispatch({ type: DATA_CALL_CHARACTERS }),
  });

  constructor(props) {
    super(props);

    this.state = {
      characters: [],
    };
  }

  sort(characters) {
    return characters.sort((character1, character2) =>
      character1.name > character2.name ? 1 : -1
    );
  }

  callGetCharacters(props, nextProps) {
    if (
      !props.loading &&
      !nextProps.loading &&
      (!Array.isArray(props.dataCharacters) ||
        props.dataCharacters.length === 0)
    ) {
      nextProps.getCharacters();
    }
  }

  componentDidMount() {
    this.callGetCharacters(this.props, this.props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let render = false;

    this.callGetCharacters(this.props, nextProps);

    if (
      (Array.isArray(nextProps.dataCharacters) &&
        nextProps.dataCharacters.length > 0 &&
        Array.isArray(this.props.dataCharacters) &&
        this.props.dataCharacters.length > 0 &&
        nextProps.dataCharacters.length !== this.props.dataCharacters.length) ||
      (Array.isArray(nextProps.dataCharacters) &&
        nextProps.dataCharacters.length > 0)
    ) {
      render = true;
    }

    return render;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (Array.isArray(prevProps.dataCharacters) &&
        prevProps.dataCharacters.length > 0 &&
        Array.isArray(this.props.dataCharacters) &&
        this.props.dataCharacters.length > 0 &&
        prevProps.dataCharacters.length !== this.props.dataCharacters.length &&
        this.props.dataCharacters.length !== this.state.characters.length) ||
      (Array.isArray(this.props.dataCharacters) &&
        this.props.dataCharacters.length > 0 &&
        this.props.dataCharacters.length !== this.state.characters.length)
    ) {
      this.setState((state, props) => ({
        characters: this.sort(props.dataCharacters),
      }));
    }
  }

  render() {
    const handleChangeSearch = (event) => {
      const value = event.target.value.toLowerCase();

      this.setState((state, props) => ({
        characters:
          value !== ""
            ? this.sort(props.dataCharacters).filter((character) =>
                character.name.toLowerCase().includes(value)
              )
            : this.sort(props.dataCharacters),
      }));
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
          {this.state.characters.map((character) => (
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
  }
}

export const CharactersRoute = withRouter(Characters);

export const CharactersRedux = connect(
  Characters.mapStateToProps,
  Characters.mapDispatchToProps
)(CharactersRoute);
