import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Table } from "../components/Table/Table.component";

export const Episodes = ({ data }) => {
  const headers = [
    { id: "episode", name: "Episode" },
    { id: "title", name: "Title" },
    { id: "detail", name: "See more" },
  ];

  return (
    <Table
      headers={headers}
      body={data}
      collapse={false}
      nameCellId="episode_id"
    ></Table>
  );
};

Episodes.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      episode_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      detail: PropTypes.node.isRequired,
      episode: PropTypes.string.isRequired,
      season: PropTypes.string,
      air_date: PropTypes.string,
      series: PropTypes.string,
      characters: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};

const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = (dispatch) => ({});

export const EpisodesRoute = withRouter(Episodes);

export const EpisodesRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(EpisodesRoute);
