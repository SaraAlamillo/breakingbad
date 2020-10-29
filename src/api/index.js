import axios from "axios";

const episodesUrl = process.env.REACT_APP_API_URL + "episodes";
const charactersUrl = process.env.REACT_APP_API_URL + "characters";
const quotesUrl = process.env.REACT_APP_API_URL + "quote";
const deathsUrl = process.env.REACT_APP_API_URL + "deaths";

/**
 * A la API solo se pueden mandar nombres con + en vez de espacios
 * @param {String} name Nombre
 */
const concatName = (name) => {
  return name.trim().replace(" ", "+");
};

/**
 * Obtiene todos los episodios de la serie
 */
export const getEpisodes = () => {
  const url = `${episodesUrl}?series=${process.env.REACT_APP_API_SERIE}`;
  return axios.get(url);
};

/**
 * Obtiene todos los personajes de la serie
 * @param {Number} limit Límite de personajes que se reciben
 * @param {Number} offset Posición del personaje donde comenzará el listado
 */
export const getCharacters = (limit, offset) => {
  let url = `${charactersUrl}?category=${process.env.REACT_APP_API_SERIE}${
    limit ? "&limit=" + limit : ""
  }${offset ? "&offset=" + offset : ""}`;

  return axios.get(url);
};

/**
 * Obtiene los detalles de un personaje
 * @param {String} name Nombre del personaje (debe ser el nombre completo o el nombre y apellido completos)
 */
export const getCharacterByName = (name) => {
  let url = `${charactersUrl}?name=${concatName(name)}`;
  return axios.get(url);
};

/**
 * Obtiene una cita aleatoria de cualquier episodio de un personaje concreto
 * @param {String} author Nombre del personaje (debe ser el nombre completo o el nombre y apellido completos)
 */
export const getRandomQuoteByAuthor = (author) => {
  let url = `${quotesUrl}?author=${concatName(author)}`;
  return axios.get(url);
};

/**
 * Obtiene todas las citas de un personaje concreto
 * @param {String} author Nombre del personaje (debe ser el nombre completo o el nombre y apellido completos)
 */
export const getQuotesByAuthor = (author) => {
  const url = `${quotesUrl}/random?author=${concatName(author)}`;
  return axios.get(url);
};

/**
 * Obtiene la información de todas las muertes
 */
export const getDeaths = () => {
  return axios.get(deathsUrl);
};
