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
import { CheckboxGroup } from "../components/Form/CheckboxGroup.component";

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

  const whereLookItems = [
    { value: "episodes", title: "Episodes" },
    { value: "characters", title: "Characters" },
    { value: "deaths", title: "Deaths" },
  ];

  const handleSubmit = (values) => {
    const something = values.something;

    if (something && something.trim().length > 0) {
      const filterData = (id, list) => {
        return values.whereLook.includes(id)
          ? list.filter((item) => objectContains(item, something))
          : [];
      };

      setData({
        episodes: {
          ...data.episodes,
          data: filterData("episodes", episodes.data),
        },
        characters: {
          ...data.characters,
          data: filterData("characters", characters.data),
        },
        deaths: {
          ...data.deaths,
          data: filterData("deaths", deaths.data),
        },
      });
    } else {
      setData({
        episodes: { ...data.episodes, data: [] },
        characters: { ...data.characters, data: [] },
        deaths: { ...data.deaths, data: [] },
      });
    }
  };

  return (
    <>
      <div>
        <Formik
          initialValues={{
            something: "",
            whereLook: ["episodes", "characters", "deaths"],
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field id="something" title="Write something..." />

            <CheckboxGroup
              id="whereLook"
              items={whereLookItems}
              title="Where to look?"
            />

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
