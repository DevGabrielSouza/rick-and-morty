import axios, { AxiosResponse } from 'axios'
import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/index'

export class AxiosHttpClient implements HttpClient {
    async request(data: HttpRequest): Promise<HttpResponse> {
        let axiosResponse: AxiosResponse
        try {
            axiosResponse = await axios.request({
                url: data.url,
                method: data.method,
                data: data.body,
                headers: data.headers,
                params: data.params,
                responseType: data.responseType,
            })
        } catch (error: any) {
            axiosResponse = error.response
        }

        return {
            statusCode: axiosResponse.status,
            body: axiosResponse?.data?.data || axiosResponse?.data,
            response: axiosResponse,
        }
    }
}
