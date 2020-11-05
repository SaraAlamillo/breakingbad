import {
  Alert as AlertMaterial,
  AlertTitle as AlertMaterialTitle,
} from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import PropTypes from "prop-types";

/**
 * Muestra un toast centrado en la parte inferior de la pantalla
 * @param {Boolean} open Si se muestra o no
 * @param {Number} autoHide Cuánto tarda en ocultarse automáticamente
 * @param {Function} handleClose Qué hace cuando se cierra
 * @param {String} type Tipo: error, warning, info o success
 * @param {String} body Cuerpo del mensaje
 * @param {String} title Título del mensaje (opcional)
 * @returns {Component}
 */
export const Alert = ({ open, autoHide, handleClose, type, body, title }) => {
  return (
    <Snackbar open={open} autoHideDuration={autoHide} onClose={handleClose}>
      <AlertMaterial onClose={handleClose} severity={type}>
        {title && <AlertMaterialTitle>{title}</AlertMaterialTitle>}
        {body}
      </AlertMaterial>
    </Snackbar>
  );
};

Alert.propTypes = {
  open: PropTypes.bool.isRequired,
  autoHide: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["error", "warning", "info", "success"]).isRequired,
  body: PropTypes.string.isRequired,
  title: PropTypes.string,
};
