import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { DATA_CALL_DEATHS } from "../actions";
import { DataGrid } from "@material-ui/data-grid";
import { Box } from "@material-ui/core";
import { Alert } from "../components/Alert/Alert.component";
import { contentData } from "../utils";

export const Deaths = ({ deaths, getDeaths }) => {
  useEffect(() => {
    if (!deaths.loading && !contentData(deaths.data)) {
      getDeaths();
    }
  }, [deaths, getDeaths]);

  const data = deaths.data.map((death) => ({
    ...death,
    id: death.death_id,
  }));

  const [extraInfo, setExtraInfo] = useState({
    open: false,
    title: "",
    body: "",
  });

  const headers = [
    { field: "death", headerName: "Death", width: 300 },
    { field: "responsible", headerName: "Responsible", width: 400 },
    { field: "season", headerName: "Season", width: 150 },
    { field: "episode", headerName: "Episode", width: 150 },
    { field: "number_of_deaths", headerName: "N. deaths", width: 150 },
  ];

  const handleOpenToast = (title, body) => {
    setExtraInfo({ open: true, title, body });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setExtraInfo({ open: false });
  };

  return (
    <>
      <Alert
        open={extraInfo.open}
        autoHide={6000}
        handleClose={handleClose}
        type="info"
        title={extraInfo.title}
        body={extraInfo.body}
      />

      <Box align="center" color="text.disabled">
        Click on header for sorting or click on cell for seeing the full
        information
      </Box>

      <DataGrid
        autoHeight={true}
        rows={data}
        columns={headers}
        pageSize={10}
        onCellClick={(CellParams) =>
          handleOpenToast(CellParams.colDef.headerName, CellParams.value)
        }
        loading={deaths.loading}
      />
    </>
  );
};

const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = (dispatch) => ({
  getDeaths: () => dispatch({ type: DATA_CALL_DEATHS }),
});

export const DeathsRoute = withRouter(Deaths);

export const DeathsRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeathsRoute);
