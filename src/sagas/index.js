import { spawn } from "redux-saga/effects";
import character from "./character";
import characters from "./characters";
import deaths from "./deaths";
import episodes from "./episodes";
import episode from "./episode";
import quote from "./quote";
import quotes from "./quotes";

export default function* rootSaga() {
  yield spawn(character);
  yield spawn(characters);
  yield spawn(deaths);
  yield spawn(quote);
  yield spawn(quotes);
  yield spawn(episodes);
  yield spawn(episode);
}
