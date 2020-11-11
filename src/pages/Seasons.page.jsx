import { AppBar, Tab as TabMaterial, Tabs } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { DATA_CALL_EPISODES } from "../actions";
import { EpisodesRedux } from "./Episodes.page";
import { seasonsStyle } from "./Seasons.style";
import SearchIcon from "@material-ui/icons/Search";
import { contentData, getValuesNotRepeat } from "../utils";

export const Seasons = ({ episodes, getEpisodes, match }) => {
  useEffect(() => {
    if (!episodes.loading && !contentData(episodes.data)) {
      getEpisodes();
    }
  }, [episodes, getEpisodes]);

  const seasons = getValuesNotRepeat(episodes.data, "season")?.map(
    (season) => ({
      id: +season.trim() - 1,
      name: season,
      route: "/seasons/" + (+season.trim() - 1),
      episodes: episodes.data
        ?.filter((episode) => episode.season.trim() === season)
        .map((episode) => ({
          ...episode,
          detail: (
            <Link to={"/episode/" + episode.episode_id}>
              <SearchIcon />
            </Link>
          ),
        })),
    })
  );

  const [tab, setTab] = useState(+match?.params?.id || 0);

  if (contentData(seasons)) {
    const minTab = seasons[0].id;
    const maxTab = seasons[seasons.length - 1].id;

    if (tab > maxTab) {
      setTab(maxTab);
    } else if (tab < minTab) {
      setTab(minTab);
    }
  }

  const styleClasses = seasonsStyle();

  const handleChange = (event, value) => {
    setTab(value);
  };

  return (
    <div className={styleClasses.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={tab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Change the current season"
        >
          {seasons.map((season) => (
            <TabMaterial
              label={season.name}
              key={season.id}
              component={Link}
              to={season.route}
            />
          ))}
        </Tabs>
      </AppBar>

      <EpisodesRedux
        data={seasons.find((season) => season.id === tab)?.episodes || []}
      ></EpisodesRedux>
    </div>
  );
};

const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = (dispatch) => ({
  getEpisodes: () => dispatch({ type: DATA_CALL_EPISODES }),
});

export const SeasonsRoute = withRouter(Seasons);

export const SeasonsRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(SeasonsRoute);
