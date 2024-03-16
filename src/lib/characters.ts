import {
  RemoteGetCharacter,
  RemoteGetCharacters,
} from "@/data/usecases/remote-getCharacters";
import { makeApiUrl, makeAxiosHttpClient } from "@/factories/http";
import { Character } from "@/types/Character";
import { Req } from "@/types/Req";

export interface GetCharacters {
  get: () => Promise<Req>;
}

export interface GetCharacter {
  get: () => Promise<Character>;
}

export const makeRemoteGetCharacters = (
  page: number,
  name: string,
  status?: string
): GetCharacters => {
  const params = {
    page: page.toString(),
    name,
    ...(status && { status }),
  };

  return new RemoteGetCharacters(
    makeApiUrl(`/api/character/?${new URLSearchParams(params).toString()}`),
    makeAxiosHttpClient()
  );
};

export const makeRemoteGetCharacter = (id: string): GetCharacter => {
  return new RemoteGetCharacter(
    makeApiUrl(`/api/character/${id}`),
    makeAxiosHttpClient()
  );
};
