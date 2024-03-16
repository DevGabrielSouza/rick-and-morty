import { Character } from "./Character";
import { Info } from "./Info";

export type Req = {
  info: Info;
  results: Character[];
};
