import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Table } from "../components/Table/Table.component";

export class Episodes extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        episode_id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        season: PropTypes.string,
        air_date: PropTypes.string,
        episode: PropTypes.string,
        series: PropTypes.string,
        characters: PropTypes.arrayOf(PropTypes.string),
      })
    ).isRequired,
  };

  static mapStateToProps = (state) => ({ ...state });

  static mapDispatchToProps = (dispatch) => ({});

  constructor(props) {
    super(props);

    this.state = {
      episodes: props.data,
    };
  }

  render() {
    const headers = [
      { id: "episode", name: "Episode" },
      { id: "title", name: "Title" },
      { id: "detail", name: "See more" },
    ];
    return (
      <Table
        headers={headers}
        body={this.state.episodes}
        collapse={false}
      ></Table>
    );
  }

  componentDidMount() {}
}

export const EpisodesRoute = withRouter(Episodes);

export const EpisodesRedux = connect(
  Episodes.mapStateToProps,
  Episodes.mapDispatchToProps
)(EpisodesRoute);
