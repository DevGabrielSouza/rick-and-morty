import { HttpClient, HttpStatusCode } from "../protocols";
import { GetCharacters } from "@/lib/characters";
import { Character } from "@/types/Character";

export class RemoteGetCharacters implements GetCharacters {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<Character[]>
  ) {}
  get = async () => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.badRequest:
        throw new Error("Bad Request");
      default:
        throw new Error("Unexpected Error");
    }
  };
}

export class RemoteGetCharacter implements GetCharacters {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<Character>
  ) {}
  get = async () => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.badRequest:
        throw new Error("Bad Request");
      default:
        throw new Error("Unexpected Error");
    }
  };
}
