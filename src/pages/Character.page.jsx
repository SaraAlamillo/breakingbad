import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  DATA_CALL_CHARACTER,
  DATA_CALL_DEATHS,
  DATA_CALL_QUOTE,
} from "../actions";
import { Box, CircularProgress } from "@material-ui/core";
import { TableVerticalHeader } from "../components/Table/TableVerticalHeader.component";
import { Dialog } from "../components/Dialog/Dialog.component";
import { contentData } from "../utils";

export const Character = ({
  loading,
  dataCharacter,
  getCharacter,
  getDeaths,
  getQuote,
  match,
  history,
}) => {
  const name = match?.params?.name || "";

  useEffect(() => {
    if (
      !loading &&
      (!contentData(dataCharacter) || dataCharacter[0]?.name !== name)
    ) {
      getCharacter(name);
    }
  }, [loading, dataCharacter, getCharacter, name]);

  const character =
    !loading && contentData(dataCharacter) ? dataCharacter[0] : undefined;

  // if (character) {
  //   character.occupation = dataCharacter[0]?.occupation?.join(", ");
  //   character.appearence = dataCharacter[0]?.appearence?.join(", ");
  // }

  const headers = [
    { id: "name", name: "Name" },
    { id: "nickname", name: "Nickname" },
    { id: "birthday", name: "Birthday" },
    { id: "status", name: "Status" },
    { id: "portrayed", name: "Portrayed" },
    { id: "occupation", name: "Occupation" },
    { id: "appearence", name: "Appearence" },
  ];

  return (
    <Dialog onClose={history.goBack}>
      {loading || !character ? (
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

          <TableVerticalHeader
            headers={headers}
            data={character}
          ></TableVerticalHeader>
        </>
      )}
    </Dialog>
  );
};

const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = (dispatch) => ({
  getCharacter: (name) =>
    dispatch({ type: DATA_CALL_CHARACTER, payload: name }),
  getDeaths: () => dispatch({ type: DATA_CALL_DEATHS }),
  getQuote: (author) => dispatch({ type: DATA_CALL_QUOTE, payload: author }),
});

export const CharacterRoute = withRouter(Character);

export const CharacterRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterRoute);
