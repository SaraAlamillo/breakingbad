import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  DATA_CALL_CHARACTER,
  DATA_CALL_DEATHS,
  DATA_CALL_QUOTE,
} from "../actions";
import CloseIcon from "@material-ui/icons/Close";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Dialog,
  Toolbar,
  IconButton,
} from "@material-ui/core";

export class Character extends Component {
  static propTypes = {};

  static defaultProps = {};

  static mapStateToProps = (state) => ({ ...state });

  static mapDispatchToProps = (dispatch) => ({
    getCharacter: (name) =>
      dispatch({ type: DATA_CALL_CHARACTER, payload: name }),
    getDeaths: () => dispatch({ type: DATA_CALL_DEATHS }),
    getQuote: (author) => dispatch({ type: DATA_CALL_QUOTE, payload: author }),
  });

  callGetCharacter(props, nextProps) {
    if (!props.loading && !nextProps.loading) {
      if (
        !Array.isArray(props.dataCharacter) ||
        props.dataCharacter.length === 0 ||
        (props.dataCharacter.length > 0 &&
          props.dataCharacter[0].name !== nextProps.match?.params?.name)
      ) {
        nextProps.getCharacter(nextProps.match?.params?.name);
      }

      if (!Array.isArray(props.dataDeaths) || props.dataDeaths.length === 0) {
        nextProps.getDeaths();
      }
    }
  }

  componentDidMount() {
    this.callGetCharacter(this.props, this.props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let render = false;

    this.callGetCharacter(this.props, nextProps);

    if (
      Array.isArray(nextProps.dataCharacter) &&
      nextProps.dataCharacter.length > 0 &&
      Array.isArray(this.props.dataCharacter) &&
      this.props.dataCharacter.length > 0 &&
      nextProps.dataCharacter[0].char_id !== this.props.dataCharacter[0].char_id
    ) {
      render = true;
    }

    return render;
  }

  render() {
    const character =
      Array.isArray(this.props.dataCharacter) &&
      this.props.dataCharacter.length > 0 &&
      this.props.dataCharacter[0].name === this.props.match?.params?.name
        ? this.props.dataCharacter[0]
        : undefined;

    return (
      <>
        <Dialog fullScreen open={true}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="close"
              onClick={this.props.history.goBack}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
          {this.props.loading || !character ? (
            <CircularProgress />
          ) : (
            <>
              <Box textAlign="center">
                <img
                  src={character?.img}
                  style={{ maxWidth: "20rem", maxHeight: "20rem" }}
                  alt="Character's img"
                />
              </Box>

              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Name
                    </TableCell>
                    <TableCell>{character?.name}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Nickname
                    </TableCell>
                    <TableCell>{character?.nickname}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Birthday
                    </TableCell>
                    <TableCell>{character?.birthday}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Status
                    </TableCell>
                    <TableCell>{character?.status}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Portrayed
                    </TableCell>
                    <TableCell>{character?.portrayed}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Occupation
                    </TableCell>
                    <TableCell>{character?.occupation?.join(", ")}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Appearence
                    </TableCell>
                    <TableCell>{character?.appearence?.join(", ")}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </>
          )}
        </Dialog>
      </>
    );
  }
}

export const CharacterRoute = withRouter(Character);

export const CharacterRedux = connect(
  Character.mapStateToProps,
  Character.mapDispatchToProps
)(CharacterRoute);
