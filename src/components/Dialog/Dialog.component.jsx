import PropTypes from "prop-types";
// import { useHistory } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import {
  Dialog as DialogMaterial,
  Toolbar,
  IconButton,
} from "@material-ui/core";

export const Dialog = ({ children, onClose, open }) => {
  return (
    <DialogMaterial fullScreen open={true}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="close"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>

      {children}
    </DialogMaterial>
  );
};

Dialog.propTypes = {
  children: PropTypes.any.isRequired,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

Dialog.defaultProps = {
  //   onClose: () => {
  //     useHistory().goBack();
  //   },
  open: true,
};
