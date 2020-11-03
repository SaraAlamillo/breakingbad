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
import { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { DATA_CALL_EPISODE } from "../actions";
import CloseIcon from "@material-ui/icons/Close";

export class Episode extends Component {
  static mapStateToProps = (state) => ({ ...state });

  static mapDispatchToProps = (dispatch) => ({
    getEpisode: (id) => dispatch({ type: DATA_CALL_EPISODE, payload: id }),
  });

  callGetEpisode(props, nextProps) {
    if (
      !props.loading &&
      !nextProps.loading &&
      (!Array.isArray(props.dataEpisode) ||
        props.dataEpisode.length === 0 ||
        (props.dataEpisode.length > 0 &&
          props.dataEpisode[0].name !== nextProps.match?.params?.id))
    ) {
      nextProps.getEpisode(nextProps.match?.params?.id);
    }
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.callGetEpisode(this.props, this.props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let render = false;

    console.log(this.props.dataEpisode);
    console.log(nextProps.dataEpisode);

    this.callGetEpisode(this.props, nextProps);

    if (
      Array.isArray(nextProps.dataEpisode) &&
      nextProps.dataEpisode.length > 0 &&
      Array.isArray(this.props.dataEpisode) &&
      this.props.dataEpisode.length > 0 &&
      nextProps.dataEpisode[0].episode_id !==
        this.props.dataEpisode[0].episode_id
    ) {
      render = true;
    }
    console.log("shouldComponentUpdate ", render);

    return render;
  }

  render() {
    const episode =
      Array.isArray(this.props.dataEpisode) && this.props.dataEpisode.length > 0
        ? this.props.dataEpisode[0]
        : undefined;

    console.log("episode ", episode);

    return (
      <>
        <Dialog fullScreen open={true}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="close"
              onClick={this.props.history.goBack}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>

          {this.props.loading || !episode ? (
            <CircularProgress />
          ) : (
            <>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Title
                    </TableCell>
                    <TableCell>{episode?.title}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Season
                    </TableCell>
                    <TableCell>{episode?.season}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Episode
                    </TableCell>
                    <TableCell>{episode?.episode}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Air date
                    </TableCell>
                    <TableCell>{episode?.air_date}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Characters
                    </TableCell>
                    <TableCell>
                      {episode?.characters?.map((character) => (
                        <Typography>
                          <Link to={"/characters/" + character}>
                            {character}
                          </Link>
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
  }
}

export const EpisodeRoute = withRouter(Episode);

export const EpisodeRedux = connect(
  Episode.mapStateToProps,
  Episode.mapDispatchToProps
)(EpisodeRoute);
