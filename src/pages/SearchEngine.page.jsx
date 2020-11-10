import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import { Field } from "../components/Form/Field.component";
import {
  DATA_CALL_CHARACTERS,
  DATA_CALL_DEATHS,
  DATA_CALL_EPISODES,
  DATA_CALL_QUOTES,
} from "../actions";
import { contentData, objectContains } from "../utils";
import { useEffect, useState } from "react";
import { Table } from "../components/Table/Table.component";

export const SearchEngine = ({
  deaths,
  getDeaths,
  episodes,
  getEpisodes,
  characters,
  getCharacters,
  ...props
}) => {
  useEffect(() => {
    if (!deaths.loading && !contentData(deaths.data)) {
      getDeaths();
    }
  }, [deaths, getDeaths]);

  useEffect(() => {
    if (!episodes.loading && !contentData(episodes.data)) {
      getEpisodes();
    }
  }, [episodes, getEpisodes]);

  useEffect(() => {
    if (!characters.loading && !contentData(characters.data)) {
      getCharacters();
    }
  }, [characters, getCharacters]);

  const [data, setData] = useState({
    episodes: {
      header: [
        { id: "title", name: "Title" },
        { id: "season", name: "Season" },
        { id: "air_date", name: "Air date" },
      ],
      nameCellId: "episode_id",
      data: [],
    },
    characters: {
      header: [
        { id: "name", name: "Name" },
        { id: "nickname", name: "Nickname" },
        { id: "status", name: "Status" },
      ],
      nameCellId: "char_id",
      data: [],
    },
    deaths: {
      header: [
        { id: "death", name: "Death" },
        { id: "responsible", name: "Responsible" },
      ],
      nameCellId: "death_id",
      data: [],
    },
  });

  const handleSubmit = (values) => {
    const something = values.something;

    if (something || something.trim().length > 0) {
      setData({
        episodes: {
          ...data.episodes,
          data: episodes.data.filter((episode) =>
            objectContains(episode, something)
          ),
        },
        characters: {
          ...data.characters,
          data: characters.data.filter((character) =>
            objectContains(character, something)
          ),
        },
        deaths: {
          ...data.deaths,
          data: deaths.data.filter((death) => objectContains(death, something)),
        },
      });
    } else {
      setData({
        episodes: { ...data.episodes, data: [] },
        characters: { ...data.characters, data: [] },
        deaths: { ...data.deaths, data: [] },
      });
    }

    console.log(data);
  };

  return (
    <>
      <div>
        <Formik
          initialValues={{
            something: "",
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field id="something" title="Write something..." />

            <button type="submit">Search</button>
          </Form>
        </Formik>
      </div>

      {Object.keys(data).map(
        (key) =>
          data[key].data.length > 0 && (
            <div>
              <Table
                headers={data[key].header}
                body={data[key].data}
                collapse={false}
                rowId={data[key].nameCellId}
                key={key}
              ></Table>
            </div>
          )
      )}
    </>
  );
};

const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = (dispatch) => ({
  getDeaths: () => dispatch({ type: DATA_CALL_DEATHS }),
  getEpisodes: () => dispatch({ type: DATA_CALL_EPISODES }),
  getCharacters: () => dispatch({ type: DATA_CALL_CHARACTERS }),
  getQuotes: () => dispatch({ type: DATA_CALL_QUOTES }),
});

export const SearchEngineRoute = withRouter(SearchEngine);

export const SearchEngineRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchEngineRoute);
