import { HttpClient, HttpStatusCode } from '../protocols'
import { GetCharacters } from '@/lib/characters'
import { Character } from '@/types/Character'

export class RemoteGetCharacters implements GetCharacters {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient<Character[]>
    ) {}
    get = async () => {
        const httpResponse = await this.httpClient.request({
            url: this.url,
            method: 'get',
        })

        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
                return httpResponse.body
            case HttpStatusCode.badRequest:
                throw new Error('Bad Request')
            case HttpStatusCode.notFound:
                throw new Error(
                    'Oops! The character you are looking for could not be found'
                )
            case HttpStatusCode.serverError:
                throw new Error('Server Error')
            case HttpStatusCode.unauthorized:
                throw new Error('Unauthorized')
            default:
                throw new Error('Unexpected Error')
        }
    }
}

export class RemoteGetCharacter implements GetCharacters {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient<Character>
    ) {}
    get = async () => {
        const httpResponse = await this.httpClient.request({
            url: this.url,
            method: 'get',
        })

        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
                return httpResponse.body
            case HttpStatusCode.badRequest:
                throw new Error('Bad Request')
            case HttpStatusCode.notFound:
                throw new Error(
                    'Oops! The character you are looking for could not be found'
                )
            case HttpStatusCode.serverError:
                throw new Error('Server Error')
            case HttpStatusCode.unauthorized:
                throw new Error('Unauthorized')
            default:
                throw new Error('Unexpected Error')
        }
    }
}
