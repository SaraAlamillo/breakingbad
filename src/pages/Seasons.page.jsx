import { AppBar, Tab, Tabs } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { DATA_CALL_EPISODES } from "../actions";
import { Route } from "react-router-dom";
import { EpisodesRedux } from "./Episodes.page";
import { seasonsStyle } from "./Seasons.style";
import SearchIcon from "@material-ui/icons/Search";

export class Seasons extends Component {
  static mapStateToProps = (state) => ({ ...state });

  static mapDispatchToProps = (dispatch) => ({
    getEpisodes: () => dispatch({ type: DATA_CALL_EPISODES }),
  });

  constructor(props) {
    super(props);

    const id =
      !props.match.isExact && +props.location.pathname.split("/").pop() - 1;
    this.state = {
      id,
      tab: id || 0,
    };
  }

  getSeasons() {
    const repeatSeasons = this.props.dataEpisodes?.map((episode) =>
      episode.season.trim()
    );
    const seasons = repeatSeasons
      ?.reduce(
        (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
        []
      )
      .sort()
      .map((season, index) => ({
        id: index,
        name: season,
        route: "/seasons/" + season,
        episodes: this.props.dataEpisodes
          ?.filter((episode) => episode.season.trim() === season)
          .map((episode) => ({
            ...episode,
            detail: (
              <Link to={"/episode/" + episode.episode_id}>
                <SearchIcon />
              </Link>
            ),
          })),
      }));

    return seasons;
  }

  componentDidMount() {
    this.props.getEpisodes();
  }

  render() {
    const styleClasses = seasonsStyle();

    const seasons = this.getSeasons();

    const handleChange = (event, value) => {
      this.setState({ tab: value });
    };

    return (
      <div className={styleClasses.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.tab}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="Change the current season"
          >
            {seasons.map((season) => (
              <Tab
                label={season.name}
                key={season.id}
                component={Link}
                to={season.route}
              />
            ))}
          </Tabs>
        </AppBar>

        {this.state.id ? (
          <Route path="/seasons/:id">
            <EpisodesRedux
              data={seasons[this.state.tab]?.episodes || []}
            ></EpisodesRedux>
          </Route>
        ) : (
          <EpisodesRedux
            data={seasons[this.state.tab]?.episodes || []}
          ></EpisodesRedux>
        )}
      </div>
    );
  }
}

export const SeasonsRoute = withRouter(Seasons);

export const SeasonsRedux = connect(
  Seasons.mapStateToProps,
  Seasons.mapDispatchToProps
)(SeasonsRoute);
