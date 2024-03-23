import { HttpClient, HttpResponse, HttpStatusCode } from '../protocols'
import { GetCharacters } from '@/lib/characters'
import { Character } from '@/types/Character'

export function handleResponse<T>(response: HttpResponse<T>): T {
    switch (response.statusCode) {
        case HttpStatusCode.ok:
            return response.body
        case HttpStatusCode.badRequest:
            throw new Error(response.body.error || 'Bad Request')
        case HttpStatusCode.notFound:
            throw new Error(
                response.body.error ||
                    'Oops! The character you are looking for could not be found'
            )
        case HttpStatusCode.serverError:
            throw new Error(response.body.error || 'Server Error')
        case HttpStatusCode.unauthorized:
            throw new Error(response.body.error || 'Unauthorized')
        default:
            throw new Error('Unexpected Error')
    }
}
export class RemoteGetCharacters implements GetCharacters {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient<Character[]>
    ) {}
    get = async (): Promise<any> => {
        const httpResponse = await this.httpClient.request({
            url: this.url,
            method: 'get',
        })

        return handleResponse(httpResponse)
    }
}

export class RemoteGetCharacter implements GetCharacters {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient<Character>
    ) {}
    get = async (): Promise<any> => {
        const httpResponse = await this.httpClient.request({
            url: this.url,
            method: 'get',
        })

        return handleResponse(httpResponse)
    }
}
