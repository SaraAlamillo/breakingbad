import {
  CircularProgress,
  Dialog,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { DATA_CALL_EPISODE } from "../actions";
import CloseIcon from "@material-ui/icons/Close";
import { contentData } from "../utils";

export const Episode = ({ episode, getEpisode, history, match, ...props }) => {
  const [idEpisode] = useState(+match?.params?.id);

  useEffect(() => {
    if (!episode.loading && !contentData(episode.data)) {
      getEpisode(idEpisode);
    }
  }, [episode, getEpisode, idEpisode]);

  const episodeData =
    !episode.loading && contentData(episode.data) ? episode.data[0] : undefined;

  return (
    <>
      <Dialog fullScreen open={true}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            onClick={history.goBack}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>

        {!episodeData ? (
          <CircularProgress />
        ) : (
          <>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Title
                  </TableCell>
                  <TableCell>{episodeData?.title}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    Season
                  </TableCell>
                  <TableCell>{episodeData?.season}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    Episode
                  </TableCell>
                  <TableCell>{episodeData?.episode}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    Air date
                  </TableCell>
                  <TableCell>{episodeData?.air_date}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    Characters
                  </TableCell>
                  <TableCell>
                    {episodeData?.characters?.map((character) => (
                      <Typography>
                        <Link to={"/characters/" + character}>{character}</Link>
                      </Typography>
                    ))}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </>
        )}
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = (dispatch) => ({
  getEpisode: (id) => dispatch({ type: DATA_CALL_EPISODE, payload: id }),
});

export const EpisodeRoute = withRouter(Episode);

export const EpisodeRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(EpisodeRoute);
