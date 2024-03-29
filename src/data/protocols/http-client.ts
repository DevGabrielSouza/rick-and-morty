import { AxiosResponse, ResponseType } from 'axios'

export type HttpMethod = 'post' | 'get' | 'put' | 'delete'

export type HttpRequest = {
    url: string
    method: HttpMethod
    body?: any
    headers?: any
    params?: any
    responseType?: ResponseType | undefined
}

export enum HttpStatusCode {
    created = 201,
    ok = 200,
    noContent = 204,
    badRequest = 400,
    unauthorized = 401,
    forbidden = 403,
    notFound = 404,
    serverError = 500,
    conflict = 409,
}

export type HttpResponse<T = any> = {
    statusCode: HttpStatusCode
    body: T | any
    response: AxiosResponse
}

export interface HttpClient<R = any> {
    request: (data: HttpRequest) => Promise<HttpResponse<R>>
}
