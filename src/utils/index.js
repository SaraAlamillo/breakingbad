/**
 * Comprueba si el valor pasado es un array y si contiene algo
 * @param {Any} value Valor a comprobar
 * @returns {Bool} True si es un array con contenido, false en caso contrario
 */
export const contentData = (value) => {
  return Array.isArray(value) && value.length > 0;
};
