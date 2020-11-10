import PropTypes from "prop-types";

/**
 * Comprueba si el valor pasado es un array y si contiene algo
 * @param {Any} value Valor a comprobar
 * @returns {Bool} True si es un array con contenido, false en caso contrario
 */
export const contentData = (value) => {
  return Array.isArray(value) && value.length > 0;
};

/**
 * Devuelve un array ordenado de forma ascendente
 * @param {Array} list Array a ordenar
 * @param {String} field Si es un array de objetos, será necesario especificar el campo por el que ser ordenará. Si no se indica, se utilizará toda la posición
 * @returns {Array} Array ordenado
 */
export const sortArray = (list, field) => {
  return list.sort((a, b) => {
    const value1 = field ? a[field] : a;
    const value2 = field ? b[field] : b;

    return value1 > value2 ? 1 : -1;
  });
};

sortArray.propTypes = {
  list: PropTypes.array.isRequired,
  field: PropTypes.string,
};

/**
 * Comprueba todas las posiciones de un objecto en busca de:
 *    1. Si es una cadena, comprueba si la posición contiene el valor pasado
 *    2. Si es un entero, comprueba si la posición es igual al valor pasado
 *    3. En cualquier otro caso, no se comprueba nada
 * @param {Object} object Objecto donde buscar
 * @param {Any} value Valor a buscar
 * @returns {Bool}
 */
export const objectContains = (object, value) => {
  const valueLowerCase = value.toLowerCase();

  return Object.values(object).some((position) =>
    typeof position === "string"
      ? position.toLowerCase().includes(valueLowerCase)
      : typeof position === "number"
      ? position === +value
      : false
  );
};

objectContains.propTypes = {
  object: PropTypes.object.isRequired,
  value: PropTypes.any.isRequired,
};
