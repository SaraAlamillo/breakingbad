import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { DATA_CALL_DEATHS } from "../actions";
import { DataGrid } from "@material-ui/data-grid";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Box, Container, Row, Col, Snackbar } from "@material-ui/core";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export class Deaths extends Component {
  static propTypes = {};

  static defaultProps = {};

  static mapStateToProps = (state) => ({ ...state });

  static mapDispatchToProps = (dispatch) => ({
    getDeaths: () => dispatch({ type: DATA_CALL_DEATHS }),
  });

  constructor(props) {
    super(props);

    this.state = {
      extraInfo: { open: false, title: "", body: "" },
    };
  }

  componentDidMount() {
    this.props.getDeaths();
  }

  render() {
    const deaths = this.props.dataDeaths.map((death) => ({
      ...death,
      id: death.death_id,
    }));

    const headers = [
      { field: "death", headerName: "Death", width: 300 },
      { field: "responsible", headerName: "Responsible", width: 400 },
      { field: "season", headerName: "Season", width: 150 },
      { field: "episode", headerName: "Episode", width: 150 },
      { field: "number_of_deaths", headerName: "N. deaths", width: 150 },
    ];

    const handleClick = (title, body) => {
      this.setState({
        ...this.state,
        extraInfo: {
          open: true,
          title,
          body,
        },
      });
    };

    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }

      this.setState({
        ...this.state,
        extraInfo: { ...this.state.extraInfo, open: false },
      });
    };

    const data = [
      {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500,
      },
      {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
    ];

    return (
      <>
        <Snackbar
          open={this.state.extraInfo.open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="info">
            <AlertTitle>{this.state.extraInfo.title}</AlertTitle>
            {this.state.extraInfo.body}
          </Alert>
        </Snackbar>

        <Box align="center" color="text.disabled">
          Click on header for sorting or click on cell for seeing the full
          information
        </Box>

        <DataGrid
          autoHeight={true}
          rows={deaths}
          columns={headers}
          pageSize={10}
          onCellClick={(CellParams) =>
            handleClick(CellParams.colDef.headerName, CellParams.value)
          }
        />
      </>
    );
  }
}

export const DeathsRoute = withRouter(Deaths);

export const DeathsRedux = connect(
  Deaths.mapStateToProps,
  Deaths.mapDispatchToProps
)(DeathsRoute);
