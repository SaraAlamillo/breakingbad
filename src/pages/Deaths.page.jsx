import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { DATA_CALL_DEATHS } from "../actions";
import { DataGrid } from "@material-ui/data-grid";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Box, Snackbar } from "@material-ui/core";

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
      deaths: [],
    };
  }

  callGetDeaths(props, nextProps) {
    if (
      !props.loading &&
      !nextProps.loading &&
      (!Array.isArray(props.dataDeaths) || props.dataDeaths.length === 0)
    ) {
      nextProps.getDeaths();
    }
  }

  componentDidMount() {
    this.callGetDeaths(this.props, this.props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let render = false;

    this.callGetDeaths(this.props, nextProps);

    if (
      Array.isArray(nextProps.dataDeaths) &&
      nextProps.dataDeaths.length > 0 &&
      Array.isArray(this.props.dataDeaths) &&
      this.props.dataDeaths.length > 0 &&
      nextProps.dataDeaths.length !== this.props.dataCharacters.length
    ) {
      render = true;
    }

    return render;
  }

  render() {
    const headers = [
      { field: "death", headerName: "Death", width: 300 },
      { field: "responsible", headerName: "Responsible", width: 400 },
      { field: "season", headerName: "Season", width: 150 },
      { field: "episode", headerName: "Episode", width: 150 },
      { field: "number_of_deaths", headerName: "N. deaths", width: 150 },
    ];

    const handleClick = (title, body) => {
      this.setState({ extraInfo: { open: true, title, body } });
    };

    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }

      this.setState((state, props) => ({
        extraInfo: { ...state.extraInfo, open: false },
      }));
    };

    const deaths = this.props.dataDeaths.map((death) => ({
      ...death,
      id: death.death_id,
    }));

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
