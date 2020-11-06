import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

export const SearchEngine = ({}) => {
  return <>SearchEngine</>;
};

const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = (dispatch) => ({});

export const SearchEngineRoute = withRouter(SearchEngine);

export const SearchEngineRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchEngineRoute);
